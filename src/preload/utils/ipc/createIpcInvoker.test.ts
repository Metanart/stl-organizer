import { ipcRenderer } from 'electron'

import { ConsolaInstance } from 'consola'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiResponse } from '@shared/domains/Common/types/Api.types'
import { IpcTag } from '@shared/domains/Common/types/IPC.types'
import { createLog } from '@shared/utils/logs/createLog'

import { createIpcInvoker, createIpcInvokerWithPayload } from './createIpcInvoker'

// Mock external dependencies
vi.mock('electron', () => ({
  ipcRenderer: {
    invoke: vi.fn()
  }
}))

vi.mock('@shared/utils/logs/createLog', () => ({
  createLog: vi.fn(() => ({
    info: Object.assign(vi.fn(), { raw: vi.fn() }),
    error: Object.assign(vi.fn(), { raw: vi.fn() })
  }))
}))

describe('createIpcInvoker', () => {
  const mockIpcRenderer = vi.mocked(ipcRenderer)
  const mockCreateLog = vi.mocked(createLog)
  const mockLog: Partial<ConsolaInstance> = {
    info: Object.assign(vi.fn(), { raw: vi.fn() }),
    error: Object.assign(vi.fn(), { raw: vi.fn() })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateLog.mockReturnValue(mockLog as ConsolaInstance)
  })

  it('creates invoker that calls ipcRenderer.invoke with correct tag', async () => {
    const tag = 'test:invoke' as IpcTag
    const expectedResponse: ApiResponse<string> = { data: 'test result' }
    mockIpcRenderer.invoke.mockResolvedValue(expectedResponse)

    const invoker = createIpcInvoker<string>(tag)
    const result = await invoker()

    expect(mockIpcRenderer.invoke).toHaveBeenCalledWith(tag)
    expect(result).toEqual(expectedResponse)
  })

  it('logs invocation with correct tag and category', async () => {
    const tag = 'test:logging' as IpcTag
    const expectedResponse: ApiResponse<number> = { data: 42 }
    mockIpcRenderer.invoke.mockResolvedValue(expectedResponse)

    const invoker = createIpcInvoker<number>(tag)
    await invoker()

    expect(mockCreateLog).toHaveBeenCalledWith({ tag, category: 'PRELOAD' })
    expect(mockLog.info).toHaveBeenCalledWith(`Invoked ${tag}`)
  })

  it('handles errors from ipcRenderer.invoke', async () => {
    const tag = 'test:error' as IpcTag
    const error = new Error('IPC error')
    mockIpcRenderer.invoke.mockRejectedValue(error)

    const invoker = createIpcInvoker<string>(tag)

    await expect(invoker()).rejects.toThrow('IPC error')
    expect(mockIpcRenderer.invoke).toHaveBeenCalledWith(tag)
  })
})

describe('createIpcInvokerWithPayload', () => {
  const mockIpcRenderer = vi.mocked(ipcRenderer)
  const mockCreateLog = vi.mocked(createLog)
  const mockLog: Partial<ConsolaInstance> = {
    info: Object.assign(vi.fn(), { raw: vi.fn() }),
    error: Object.assign(vi.fn(), { raw: vi.fn() })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateLog.mockReturnValue(mockLog as ConsolaInstance)
  })

  it('creates invoker that calls ipcRenderer.invoke with tag and payload', async () => {
    const tag = 'test:with-payload' as IpcTag
    const payload = { id: 123, name: 'test' }
    const expectedResponse: ApiResponse<boolean> = { data: true }
    mockIpcRenderer.invoke.mockResolvedValue(expectedResponse)

    const invoker = createIpcInvokerWithPayload<boolean, typeof payload>(tag)
    const result = await invoker(payload)

    expect(mockIpcRenderer.invoke).toHaveBeenCalledWith(tag, payload)
    expect(result).toEqual(expectedResponse)
  })

  it('logs invocation with payload when payload is provided', async () => {
    const tag = 'test:payload-logging' as IpcTag
    const payload = { value: 'test data' }
    const expectedResponse: ApiResponse<string> = { data: 'success' }
    mockIpcRenderer.invoke.mockResolvedValue(expectedResponse)

    const invoker = createIpcInvokerWithPayload<string, typeof payload>(tag)
    await invoker(payload)

    expect(mockCreateLog).toHaveBeenCalledWith({ tag, category: 'PRELOAD' })
    expect(mockLog.info).toHaveBeenCalledWith(`Invoked ${tag} with payload`, payload)
  })

  it('returns error response when payload is falsy', async () => {
    const tag = 'test:no-payload' as IpcTag

    const invoker = createIpcInvokerWithPayload<string, string>(tag)

    // Test with empty string (falsy value)
    const resultEmpty = await invoker('')
    expect(resultEmpty).toEqual({
      data: null,
      error: `Invoked ${tag} without payload`
    })
    expect(mockLog.error).toHaveBeenCalledWith(`Invoked ${tag} without payload`)

    // Test with another falsy value
    vi.clearAllMocks()
    mockCreateLog.mockReturnValue(mockLog as ConsolaInstance)

    // Use a type assertion to test the actual behavior with falsy values
    const resultFalsy = await (invoker as (payload: unknown) => Promise<ApiResponse<string>>)('')
    expect(resultFalsy).toEqual({
      data: null,
      error: `Invoked ${tag} without payload`
    })
    expect(mockLog.error).toHaveBeenCalledWith(`Invoked ${tag} without payload`)
  })

  it('handles errors from ipcRenderer.invoke with payload', async () => {
    const tag = 'test:payload-error' as IpcTag
    const payload = { data: 'test' }
    const error = new Error('IPC payload error')
    mockIpcRenderer.invoke.mockRejectedValue(error)

    const invoker = createIpcInvokerWithPayload<string, typeof payload>(tag)

    await expect(invoker(payload)).rejects.toThrow('IPC payload error')
    expect(mockIpcRenderer.invoke).toHaveBeenCalledWith(tag, payload)
  })
})
