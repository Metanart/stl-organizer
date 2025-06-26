import { handleServiceToIpc } from '@main/utils/handleServiceToIpc'

import { ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/dtos/ConfigDTO'

import { ConfigService } from '../services/ConfigService'

handleServiceToIpc<ConfigDTO | null>('ConfigIpc.get', ConfigService.get)

handleServiceToIpc<ConfigDTO | null, ConfigUpdateDTO>('ConfigIpc.update', ConfigService.update)
