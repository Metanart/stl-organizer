import z from 'zod'

import { sourceCreateSchema } from '../schemes/SourceSchemes'

export type SourceDTO = {
  id: string
  path: string
  name: string
  comment: string | null
  isEnabled: boolean
}

export type SourceCreateDTO = {
  path: string
  name: string
  comment?: string
  isEnabled?: boolean
}

export type SourceUpdateDTO = {
  id: string
  path?: string
  name?: string
  comment?: string
  isEnabled?: boolean
}

export type SourceFormDTO = {
  id: string
  path: string
  name: string
  comment?: string
  isEnabled?: boolean
}

export type SourceCreateFormDTO = z.infer<typeof sourceCreateSchema>

export type SourceUpdateFormDTO = {
  id: string
  path?: string
  name?: string
  comment?: string
  isEnabled?: boolean
}

export enum SOURCES_DTO_KEYS {
  Source = 'Source',
  SourceDTO = 'SourceDTO',
  SourceFormDTO = 'SourceFormDTO',
  SourceCreateDTO = 'SourceCreateDTO',
  SourceCreateFormDTO = 'SourceCreateFormDTO',
  SourceUpdateDTO = 'SourceUpdateDTO',
  SourceUpdateFormDTO = 'SourceUpdateFormDTO'
}
