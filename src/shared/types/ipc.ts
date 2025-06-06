export type IpcResponse<T> = Promise<{
  success: boolean
  error?: string
  data?: T
}>
