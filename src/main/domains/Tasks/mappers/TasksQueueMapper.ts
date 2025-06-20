import { TaskQueue } from '../entities/TaskQueue'

function toDTO(entity: TaskQueue): SourceDTO {
  return {
    id: entity.id,
    name: entity.name,
    path: entity.path,
    isEnabled: entity.isEnabled,
    comment: entity.comment ?? null,
    models: []
  } satisfies SourceDTO
}

function toDTOs(entities: SourceEntity[]): SourceDTO[] {
  return entities.map((entity) => toDTO(entity))
}

export const TasksQueueMapper = {
  toDTO,
  toDTOs
}
