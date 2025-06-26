import { handleServiceToIpc } from '@main/utils/handleServiceToIpc'

import { RemoveDTO } from '@shared/domains/Common/dtos/DTOs'
import { SourceCreateDTO, SourceDTO, SourceUpdateDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesService } from '../service/SourcesService'

handleServiceToIpc<SourceDTO | null, SourceCreateDTO>('SourcesIpc.create', SourcesService.create)

handleServiceToIpc<SourceDTO | null, SourceUpdateDTO>('SourcesIpc.update', SourcesService.update)

handleServiceToIpc<SourceDTO[] | null>('SourcesIpc.getAll', SourcesService.getAll)

handleServiceToIpc<boolean, RemoveDTO>('SourcesIpc.remove', SourcesService.remove)
