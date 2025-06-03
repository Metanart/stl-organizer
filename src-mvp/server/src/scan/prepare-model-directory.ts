// src/utils/prepareModelDirectory.ts
import AdmZip from 'adm-zip'
import { spawn } from 'child_process'
import { randomUUID } from 'crypto'
import fs from 'fs-extra'
import { tmpdir } from 'os'
import path from 'path'

export async function extractImagesFromZip(zipPath: string, outputDir: string) {
  const zip = new AdmZip(zipPath)
  const entries = zip.getEntries()
  for (const entry of entries) {
    if (!entry.isDirectory && /\.(jpg|jpeg|png|webp)$/i.test(entry.entryName)) {
      const outputPath = path.join(outputDir, path.basename(entry.entryName))
      await fs.writeFile(outputPath, entry.getData())
    }
  }
}

const IMAGE_EXT_REGEX = /\.(jpe?g|png|webp)$/i

export async function extractImagesFromRar(rarPath: string, outputDir: string): Promise<void> {
  const tempDir = path.join(tmpdir(), `unrar-${randomUUID()}`)
  await fs.mkdir(tempDir, { recursive: true })

  await new Promise<void>((resolve, reject) => {
    const process = spawn('unrar', ['x', '-y', rarPath, tempDir])

    let stderr = ''
    process.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    process.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`unrar exited with code ${code}\n${stderr}`))
      }
      resolve()
    })
  })

  await copyImagesRecursive(tempDir, outputDir)
  await fs.rm(tempDir, { recursive: true, force: true })
}

async function copyImagesRecursive(fromDir: string, toDir: string): Promise<void> {
  const entries = await fs.readdir(fromDir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(fromDir, entry.name)

    if (entry.isDirectory()) {
      await copyImagesRecursive(fullPath, toDir)
    } else if (IMAGE_EXT_REGEX.test(entry.name)) {
      const flatName = path.basename(entry.name)
      const destPath = path.join(toDir, flatName)
      try {
        await fs.copyFile(fullPath, destPath)
      } catch (err) {
        console.warn(`Failed to copy ${fullPath} to ${destPath}:`, err)
      }
    }
  }
}

export async function prepareModelDirectory({
  safeName,
  archivePath,
  externalImages,
  outputRoot
}: {
  safeName: string
  archivePath: string
  externalImages: string[]
  outputRoot: string
}) {
  const modelDir = path.join(outputRoot, safeName)
  const galleryDir = path.join(modelDir, 'gallery')

  try {
    await fs.ensureDir(galleryDir)

    // Copy archive
    const archiveTarget = path.join(modelDir, path.basename(archivePath))
    await fs.copy(archivePath, archiveTarget)

    if (archivePath !== archiveTarget) {
      try {
        await fs.remove(archivePath)
        console.log(`🗑️ Removed original archive: ${archivePath}`)
      } catch (err) {
        console.warn(`Failed to remove original archive: ${archivePath}`, err)
      }
    }

    // Copy external images
    for (const imgPath of externalImages) {
      const dest = path.join(galleryDir, path.basename(imgPath))
      await fs.copy(imgPath, dest)
      try {
        await fs.remove(imgPath)
        console.log(`🗑️ Removed external image: ${imgPath}`)
      } catch (err) {
        console.warn(`Failed to remove external image: ${imgPath}`, err)
      }
    }

    // Extract internal images
    const ext = path.extname(archiveTarget).toLowerCase()
    if (ext === '.zip') {
      await extractImagesFromZip(archiveTarget, galleryDir)
    } else if (ext === '.rar') {
      await extractImagesFromRar(archiveTarget, galleryDir)
    }

    // Recursively collect image metadata
    const allImagePaths: string[] = []
    const walk = async (dir: string) => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)
        if (entry.isDirectory()) {
          await walk(fullPath)
        } else if (/\.(jpe?g|png|webp)$/i.test(entry.name)) {
          allImagePaths.push(fullPath)
        }
      }
    }
    await walk(galleryDir)

    const images = await Promise.all(
      allImagePaths.map(async (fullPath) => {
        const file = path.basename(fullPath)

        return {
          name: file,
          fullPath
        }
      })
    )

    const archiveInfo = {
      name: path.basename(archiveTarget),
      fullPath: archiveTarget,
      type: ext.slice(1)
    }

    return {
      name: safeName,
      safeName,
      archive: archiveInfo,
      images,
      modelDir
    }
  } catch (err) {
    await fs.remove(modelDir)
    throw err
  }
}
