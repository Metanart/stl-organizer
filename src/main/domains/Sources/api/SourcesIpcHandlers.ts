import { handleServiceToIpc } from '@main/utils/handleServiceToIpc'

import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/Sources.dtos'

import { SourcesRepo } from '../service/SourcesService'

handleServiceToIpc<SourceDTO | null, SourceCreateDTO>('SourcesIpc.create', SourcesRepo.create)

handleServiceToIpc<SourceDTO[] | null>('SourcesIpc.getAll', SourcesRepo.getAll)

handleServiceToIpc<boolean, RemoveDTO>('SourcesIpc.remove', SourcesRepo.remove)
