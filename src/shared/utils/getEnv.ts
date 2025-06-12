export function getEnv(key: string): string | undefined {
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env[key]
  }

  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env[key]
  }

  return undefined
}
