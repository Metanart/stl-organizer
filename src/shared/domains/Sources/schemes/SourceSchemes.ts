import { z } from 'zod'

import { SOURCE_NAME_REGEX } from '@shared/utils/regexp'

export const sourceCreateSchema = z.object({
  path: z.string().min(1, 'Path is required'),
  name: z.string().regex(SOURCE_NAME_REGEX, 'Invalid name format'),
  comment: z.string().optional(),
  isEnabled: z.boolean()
})
