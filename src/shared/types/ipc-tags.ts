export type IpcEntityTag = 'config' | 'sourceFolders'

export type IpcActionTag = 'get' | 'getAll' | 'getFirst' | 'create' | 'update' | 'delete'

export type IpcTag = `${IpcEntityTag}:${IpcActionTag}`
