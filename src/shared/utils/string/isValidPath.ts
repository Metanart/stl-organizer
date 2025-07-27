import { isWindows } from '../os/isWindows'
import {
  UNIX_ABSOLUTE_PATH_REGEXP,
  UNIX_RELATIVE_PATH_REGEXP,
  WINDOWS_ABSOLUTE_PATH_REGEXP,
  WINDOWS_RELATIVE_PATH_REGEXP
} from '../regexp'

const WINDOWS_RESERVED_NAMES = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])$/i

export function isPathValid(path: string, isRelative = false): boolean {
  if (!path || typeof path !== 'string') return false

  if (isWindows) {
    const baseName = path.split(/[/\\]/).pop() ?? ''
    if (WINDOWS_RESERVED_NAMES.test(baseName)) return false

    return isRelative
      ? WINDOWS_RELATIVE_PATH_REGEXP.test(path) || WINDOWS_ABSOLUTE_PATH_REGEXP.test(path)
      : WINDOWS_ABSOLUTE_PATH_REGEXP.test(path)
  }

  return isRelative
    ? UNIX_RELATIVE_PATH_REGEXP.test(path) || UNIX_ABSOLUTE_PATH_REGEXP.test(path)
    : UNIX_ABSOLUTE_PATH_REGEXP.test(path)
}
