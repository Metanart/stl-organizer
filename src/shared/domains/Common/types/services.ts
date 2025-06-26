import { Action, Domain } from './common'

export type ServiceTag = `${Domain}Service.${Action}`
