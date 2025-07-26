import { isWindows } from '../os/isWindows'
import {
  UNIX_ABSOLUTE_PATH_REGEXP,
  UNIX_RELATIVE_PATH_REGEXP,
  WINDOWS_ABSOLUTE_PATH_REGEXP,
  WINDOWS_RELATIVE_PATH_REGEXP
} from '../regexp'

export function isValidPath(path: string, isRelative: boolean = false): boolean {
  if (!path || typeof path !== 'string') return false

  if (isWindows) {
    return isRelative
      ? WINDOWS_RELATIVE_PATH_REGEXP.test(path) || WINDOWS_ABSOLUTE_PATH_REGEXP.test(path)
      : WINDOWS_ABSOLUTE_PATH_REGEXP.test(path)
  }

  // unix
  return isRelative
    ? UNIX_RELATIVE_PATH_REGEXP.test(path) || UNIX_ABSOLUTE_PATH_REGEXP.test(path)
    : UNIX_ABSOLUTE_PATH_REGEXP.test(path)
}
