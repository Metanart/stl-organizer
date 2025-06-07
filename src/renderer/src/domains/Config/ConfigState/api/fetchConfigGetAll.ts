import { ConfigState } from '../../Config.types'
import { Response } from '@shared/types/common'

export const fetchConfig = async (): Promise<Response<ConfigState>> => {
  try {
    const response = await window.api.config.getAll()
    return {success: true, data: response.data}
  } catch (error) {
    return  { success: false, error: error as Error }
}
