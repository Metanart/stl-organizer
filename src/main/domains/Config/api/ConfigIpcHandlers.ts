import { handleServiceToIpc } from '@main/utils/ipc/handleServiceToIpc'

import { ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/Config.dtos'

import { ConfigRepo } from '../repo/ConfigRepo'

handleServiceToIpc<ConfigDTO | null>('ConfigIpc.get', ConfigRepo.get)

handleServiceToIpc<ConfigDTO | null, ConfigUpdateDTO>('ConfigIpc.update', ConfigRepo.update)
