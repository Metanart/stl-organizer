import { Action, Domain } from './Common.types'

// These Ipc tags are used to invoke methods from the main process
// and they should be the same as the ones used in the main process

export type IpcDomain = `${Domain}Ipc`

export type IpcMethod = Action

export type IpcTag = `${IpcDomain}.${IpcMethod}`

export type IpcTagCustom = 'dialog.select-folder'
