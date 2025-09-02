import { spawn } from 'node:child_process'

import { detectPlatform } from '@main/utils/detectPlatform'

export function resolveUnrarPath(): string {
  const exe: 'unrar.exe' | 'unrar' = process.platform === 'win32' ? 'unrar.exe' : 'unrar'

  // prod (packed app)
  const prod = join(
    (process as unknown as { resourcesPath?: string }).resourcesPath ?? process.cwd(),
    'bin',
    detectPlatform(),
    exe
  )
  if (existsSync(prod)) return prod

  // dev (electron-vite)
  const dev = resolve(process.cwd(), 'resources', 'bin', detectPlatform(), exe)
  if (existsSync(dev)) return dev

  throw new Error(`unrar not found: ${prod} | ${dev}`)
}

export interface ListRarOptions {
  password?: string
  signal?: AbortSignal
}

/** Запускает бинарь unrar и возвращает stdout как UTF-8 строку */
function runUnrarProcess(
  unrarArguments: readonly string[],
  abortSignal?: AbortSignal
): Promise<string> {
  const unrarExecutablePath = resolveUnrarPath()

  return new Promise((resolveOutput, rejectError) => {
    const childProcess = spawn(unrarExecutablePath, unrarArguments, {
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
      signal: abortSignal
    })

    let stdoutText = ''
    let stderrText = ''

    childProcess.stdout.setEncoding('utf8').on('data', (chunk: string) => {
      stdoutText += chunk
    })

    childProcess.stderr.setEncoding('utf8').on('data', (chunk: string) => {
      stderrText += chunk
    })

    childProcess.once('error', rejectError)

    childProcess.once('close', (exitCode: number) => {
      if (exitCode === 0) {
        resolveOutput(stdoutText)
      } else {
        rejectError(new Error(`unrar exited with code ${exitCode}: ${stderrText || stdoutText}`))
      }
    })
  })
}

/**
 * Возвращает список путей файлов внутри RAR (один путь на строку).
 * Требует встроенного бинаря unrar. Для зашифрованных заголовков передай password.
 */
export async function listRar(
  archivePath: string,
  options: ListRarOptions = {}
): Promise<string[]> {
  const passwordFlag = options.password ? `-p${options.password}` : '-p-'
  // lb — bare list; -idq — тихий вывод; -scu — UTF-8 для консоли (если поддерживается)
  const rawStdout = await runUnrarProcess(
    ['lb', '-idq', '-scu', passwordFlag, archivePath],
    options.signal
  )
  return rawStdout.split(/\r?\n/).filter(Boolean)
}

import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { join, resolve } from 'node:path'

export interface ExtractRarOptions {
  overwrite?: boolean
  password?: string
  signal?: AbortSignal
}

/**
 * Распаковывает весь архив RAR в указанный каталог.
 * Требует доступной функции runUnrarProcess (см. ранее).
 */
export async function extractRar(
  archivePath: string,
  outputDirectory: string,
  options: ExtractRarOptions = {}
): Promise<void> {
  const overwriteFlag = options.overwrite ? '-o+' : '-o-'
  const passwordFlag = options.password ? `-p${options.password}` : '-p-'

  // гарантируем, что каталог назначения существует
  await mkdir(outputDirectory, { recursive: true })

  // x — extract with full paths; -y — auto-yes; -idq — quiet; -scu — UTF-8
  await runUnrarProcess(
    ['x', '-y', overwriteFlag, passwordFlag, '-idq', '-scu', archivePath, outputDirectory],
    options.signal
  )
}

export interface IsRarPasswordProtectedOptions {
  signal?: AbortSignal
}

/**
 * Проверяет, требует ли архив RAR пароль.
 * Логика: пытаемся выполнить `unrar t` без пароля (-p-).
 * - Если команда успешна → архив НЕ запаролен.
 * - Если упала с сообщением про пароль/шифрование → архив запаролен.
 * - Иные ошибки (битый архив, I/O и т.п.) пробрасываем наверх.
 */
export async function isRarPasswordProtected(
  archivePath: string,
  options: IsRarPasswordProtectedOptions = {}
): Promise<boolean> {
  try {
    // t — test archive; -idq — quiet; -p- — не спрашивать пароль
    await runUnrarProcess(['t', '-idq', '-p-', archivePath], options.signal)
    return false
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const text = String(error?.message ?? '').toLowerCase()
    // эвристика по сообщениям unrar
    const indicators = [
      'password', // "password required", "wrong password"
      'encrypted', // "encrypted file", "encrypted headers"
      'headers encrypted' // заголовки зашифрованы
    ]
    if (indicators.some((kw) => text.includes(kw))) {
      return true
    }
    // иная причина (коррупция, отсутствие файла и т.п.) — пробрасываем
    throw error
  }
}

/**
 * Проверка архива на целостность
 * @param archive - путь к архиву
 * @param password - пароль
 * @param signal - сигнал отмены
 * @returns - true, если архив целостный, false, если нет
 */
export async function testRar(
  archive: string,
  password?: string,
  signal?: AbortSignal
): Promise<boolean> {
  const pass = password ? `-p${password}` : '-p-'
  try {
    await runUnrarProcess(['t', '-idq', pass, archive], signal)
    return true
  } catch {
    return false
  }
}
