import { handleServiceToIpc } from '@main/utils/ipc/handleServiceToIpc'

import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/Sources.dtos'

import { SourcesRepo } from '../repo/SourcesRepo'

handleServiceToIpc<SourceDTO | null, SourceCreateDTO>('SourcesIpc.create', SourcesRepo.create)

handleServiceToIpc<SourceDTO[] | null>('SourcesIpc.getAll', SourcesRepo.getAll)

handleServiceToIpc<boolean, RemoveDTO>('SourcesIpc.remove', SourcesRepo.remove)
