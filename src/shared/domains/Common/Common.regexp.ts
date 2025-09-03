export const WINDOWS_ABSOLUTE_PATH_REGEXP = /^[a-zA-Z]:\\(?:[^<>:"/\\|?*\r\n]+\\?)*$/
export const WINDOWS_RELATIVE_PATH_REGEXP =
  /^(?!^(?:[a-zA-Z]:\\|\\\\)).*(?:[^<>:"/\\|?*\r\n]+\\?)*$/

export const UNIX_ABSOLUTE_PATH_REGEXP = /^(?:\/[^/\0]+)+\/?$/
export const UNIX_RELATIVE_PATH_REGEXP = /^(?!\/)(?:[^/\0]+\/?)+$/
