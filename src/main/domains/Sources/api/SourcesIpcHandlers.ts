import { handleServiceToIpc } from '@main/utils/handleServiceToIpc'

import { RemoveDTO } from '@shared/domains/Common/Common.dtos'
import { SourceCreateDTO, SourceDTO } from '@shared/domains/Sources/Sources.dtos'

import { SourcesService } from '../service/SourcesService'

handleServiceToIpc<SourceDTO | null, SourceCreateDTO>('SourcesIpc.create', SourcesService.create)

handleServiceToIpc<SourceDTO[] | null>('SourcesIpc.getAll', SourcesService.getAll)

handleServiceToIpc<boolean, RemoveDTO>('SourcesIpc.remove', SourcesService.remove)
