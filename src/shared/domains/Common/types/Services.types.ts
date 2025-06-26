import { Action, Domain } from './Common.types'

export type ServiceTag = `${Domain}Service.${Action}`
