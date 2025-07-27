import { LL } from '@i18n/i18n'
import { z } from 'zod'

import { SOURCE_NAME_REGEX } from '@shared/utils/regexp'

const fieldsLexemes = LL.sources.createForm.fields

export const SourcesCreateFormSchema = z.object({
  name: z
    .string()
    .min(1, fieldsLexemes.name.errors.required())
    .regex(SOURCE_NAME_REGEX, fieldsLexemes.name.errors.invalid()),
  path: z.string().min(1, fieldsLexemes.path.errors.required()),
  comment: z.string().optional(),
  isEnabled: z.boolean()
})
