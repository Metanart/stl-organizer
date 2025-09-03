import { ConsolaInstance } from 'consola'
import { ipcMain } from 'electron'
import { IpcMainInvokeEvent } from 'electron/main'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiResponse } from '@shared/domains/Common/types/Api.types'
import { IpcTag } from '@shared/domains/Common/types/IPC.types'
import { createLog } from '@shared/utils/createLog'

import { handleServiceToIpc } from './handleServiceToIpc'

// Mock external dependencies
vi.mock('electron', () => ({
  ipcMain: {
    handle: vi.fn()
  }
}))

vi.mock('@shared/utils/createLog', () => ({
  createLog: vi.fn(() => ({
    error: Object.assign(vi.fn(), { raw: vi.fn() })
  }))
}))

describe('handleServiceToIpc', () => {
  const mockIpcMain = vi.mocked(ipcMain)
  const mockCreateLog = vi.mocked(createLog)
  const mockLog: Partial<ConsolaInstance> = {
    error: Object.assign(vi.fn(), { raw: vi.fn() })
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockCreateLog.mockReturnValue(mockLog as ConsolaInstance)
  })

  it('registers IPC handler with correct tag', () => {
    const tag = 'test:handler' as IpcTag
    const serviceHandler = vi.fn().mockResolvedValue('test result')

    handleServiceToIpc(tag, serviceHandler)

    expect(mockIpcMain.handle).toHaveBeenCalledWith(tag, expect.any(Function))
  })

  it('handles service handler without parameters successfully', async () => {
    const tag = 'test:no-params' as IpcTag
    const serviceHandler = vi.fn().mockResolvedValue('success result')

    handleServiceToIpc(tag, serviceHandler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1] as (
      event: IpcMainInvokeEvent,
      ...args: unknown[]
    ) => Promise<ApiResponse<string>>
    const mockEvent = {} as IpcMainInvokeEvent

    const result = await registeredHandler(mockEvent)

    expect(serviceHandler).toHaveBeenCalledWith()
    expect(result).toEqual({
      data: 'success result'
    })
  })

  it('handles service handler with parameters successfully', async () => {
    const tag = 'test:with-params' as IpcTag
    const serviceHandler = vi.fn().mockResolvedValue('param result')
    const payload = { id: 123, name: 'test' }

    handleServiceToIpc(tag, serviceHandler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1] as (
      event: IpcMainInvokeEvent,
      ...args: unknown[]
    ) => Promise<ApiResponse<string>>
    const mockEvent = {} as IpcMainInvokeEvent

    const result = await registeredHandler(mockEvent, payload)

    expect(serviceHandler).toHaveBeenCalledWith(payload)
    expect(result).toEqual({
      data: 'param result'
    })
  })

  it('handles service handler errors and returns error response', async () => {
    const tag = 'test:error' as IpcTag
    const errorMessage = 'Service error occurred'
    const serviceHandler = vi.fn().mockRejectedValue(new Error(errorMessage))

    handleServiceToIpc(tag, serviceHandler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1] as (
      event: IpcMainInvokeEvent,
      ...args: unknown[]
    ) => Promise<ApiResponse<unknown>>
    const mockEvent = {} as IpcMainInvokeEvent

    const result = await registeredHandler(mockEvent)

    expect(serviceHandler).toHaveBeenCalledWith()
    expect(mockLog.error).toHaveBeenCalledWith(new Error(errorMessage))
    expect(result).toEqual({
      error: errorMessage
    })
  })

  it('handles empty response and returns error', async () => {
    const tag = 'test:empty-response' as IpcTag
    const serviceHandler = vi.fn().mockResolvedValue(null)

    handleServiceToIpc(tag, serviceHandler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1] as (
      event: IpcMainInvokeEvent,
      ...args: unknown[]
    ) => Promise<ApiResponse<null>>
    const mockEvent = {} as IpcMainInvokeEvent

    const result = await registeredHandler(mockEvent)

    expect(serviceHandler).toHaveBeenCalledWith()
    expect(mockLog.error).toHaveBeenCalledWith('Empty response received')
    expect(result).toEqual({
      error: 'Empty response received from service'
    })
  })

  it('handles unknown errors and returns generic error message', async () => {
    const tag = 'test:unknown-error' as IpcTag
    const serviceHandler = vi.fn().mockRejectedValue('String error without message property')

    handleServiceToIpc(tag, serviceHandler)

    const registeredHandler = mockIpcMain.handle.mock.calls[0][1] as (
      event: IpcMainInvokeEvent,
      ...args: unknown[]
    ) => Promise<ApiResponse<unknown>>
    const mockEvent = {} as IpcMainInvokeEvent

    const result = await registeredHandler(mockEvent)

    expect(serviceHandler).toHaveBeenCalledWith()
    expect(mockLog.error).toHaveBeenCalledWith('String error without message property')
    expect(result).toEqual({
      error: 'Unknown error'
    })
  })
})
