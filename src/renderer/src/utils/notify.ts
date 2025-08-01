import { enqueueSnackbar, SnackbarKey, VariantType } from 'notistack'

export function notify(message: string, variant: VariantType = 'default'): SnackbarKey {
  return enqueueSnackbar(message, { variant })
}
