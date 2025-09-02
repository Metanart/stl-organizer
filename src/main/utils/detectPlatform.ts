type Platform = 'win-x64' | 'macos-arm' | 'macos-x64' | 'linux-x64' | 'linux-freebsd'

export function detectPlatform(): Platform {
  if (process.platform === 'win32') return 'win-x64'
  if (process.platform === 'darwin') return process.arch === 'arm64' ? 'macos-arm' : 'macos-x64'
  if (process.platform === 'linux') return 'linux-x64'
  if (process.platform === 'freebsd') return 'linux-freebsd'
  throw new Error(`Unsupported platform: ${process.platform}/${process.arch}`)
}
