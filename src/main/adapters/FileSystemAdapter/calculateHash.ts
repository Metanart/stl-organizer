import { createHash } from 'crypto'
import { createReadStream } from 'fs'

import { toAppError } from '@shared/utils/errors/AppError'
import { createLog } from '@shared/utils/logs/createLog'

const log = createLog({ tag: 'MAIN' })

export async function calculateHash(
  filePath: string,
  options: {
    algorithm?: 'sha256' | 'sha1' | 'md5'
    encoding?: 'hex' | 'base64'
    signal?: AbortSignal
  } = {}
): Promise<string> {
  const algorithm = options.algorithm ?? 'sha256'
  const encoding = options.encoding ?? 'hex'

  try {
    const hash = createHash(algorithm)
    const stream = createReadStream(filePath, { signal: options.signal })

    for await (const chunk of stream) {
      hash.update(chunk as Buffer)
    }

    return hash.digest(encoding)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message = `Failed to hash "${filePath}" with ${algorithm}: ${error?.message ?? String(error)}`
    log.error(message)
    throw toAppError(error, {
      code: 'FILE_HASH_FAILED',
      domain: 'FILE_SYSTEM_ADAPTER',
      message
    })
  }
}
