import { handleServiceToIpc } from '@main/utils/handleServiceToIpc'

import { ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/Config.dtos'

import { ConfigRepo } from '../services/ConfigRepo'

handleServiceToIpc<ConfigDTO | null>('ConfigIpc.get', ConfigRepo.get)

handleServiceToIpc<ConfigDTO | null, ConfigUpdateDTO>('ConfigIpc.update', ConfigRepo.update)
