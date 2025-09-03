import { LL } from '@i18n/utils/i18n-LL.async'
import { z } from 'zod'

import { SOURCE_NAME_REGEX } from './Sources.regexp'

const fieldsLexemes = LL.sources.createForm.fields

console.log('fieldsLexemes', LL.sources.createForm.fields.name.errors.required())

export const SourceCreateFormSchema = z.object({
  name: z
    .string()
    .min(3, fieldsLexemes.name.errors.required())
    .regex(SOURCE_NAME_REGEX, fieldsLexemes.name.errors.invalid()),
  path: z.string().min(3, fieldsLexemes.path.errors.required()),
  comment: z.string().optional(),
  isEnabled: z.boolean()
})
