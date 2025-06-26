import { Action, Domain } from './common'

// These Ipc tags are used to invoke methods from the main process
// and they should be the same as the ones used in the main process

export type IpcTag = `${Domain}Ipc.${Action}`

export type IpcTagCustom = 'dialog.select-folder'
