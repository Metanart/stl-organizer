import { LL } from '@i18n/utils/i18n-LL.sync'
import { z } from 'zod'

const fieldsLexemes = LL.config.updateForm.fields

export const ConfigUpdateFormSchema = z.object({
  outputFolder: z.string().min(3, fieldsLexemes.outputFolder.errors.required()),
  tempFolder: z.string().min(3, fieldsLexemes.tempFolder.errors.required()),
  maxThreads: z
    .number()
    .min(1, fieldsLexemes.maxThreads.errors.required())
    .max(6, fieldsLexemes.maxThreads.errors.required()),
  autoProcessOnScan: z.boolean(),
  autoArchiveOnComplete: z.boolean(),
  useMultithreading: z.boolean(),
  debugMode: z.boolean()
})
