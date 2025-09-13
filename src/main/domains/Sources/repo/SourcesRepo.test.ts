import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  SourceCreateDTO,
  SourceDTO,
  SOURCES_DTO_KEYS,
  SourceUpdateDTO
} from '@shared/domains/Sources/Sources.dtos'

import { Source } from '../entities/Source'

import { SourcesRepo } from './SourcesRepo'

const mockFindOneBy = vi.hoisted(() => vi.fn())
const mockFind = vi.hoisted(() => vi.fn())
const mockFindOne = vi.hoisted(() => vi.fn())
const mockCreate = vi.hoisted(() => vi.fn())
const mockSave = vi.hoisted(() => vi.fn())
const mockMerge = vi.hoisted(() => vi.fn())
const mockDelete = vi.hoisted(() => vi.fn())

const mockRepository = vi.hoisted(() => ({
  findOneBy: mockFindOneBy,
  find: mockFind,
  findOne: mockFindOne,
  create: mockCreate,
  save: mockSave,
  merge: mockMerge,
  delete: mockDelete
}))

const mockMap = vi.hoisted(() => vi.fn())
const mockMapArray = vi.hoisted(() => vi.fn())

const mockLog = vi.hoisted(() => ({
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
  success: vi.fn()
}))

vi.mock('@main/database/AppDataSource', () => ({
  AppDataSource: {
    getRepository: vi.fn(() => mockRepository)
  }
}))
vi.mock('@main/domains/Sources/mappers/SourcesMapper', () => ({
  SourcesMapper: {
    map: mockMap,
    mapArray: mockMapArray
  }
}))
vi.mock('@shared/utils/logs/createLog', () => ({
  createLog: vi.fn(() => mockLog)
}))

describe('SourcesRepo', () => {
  const sampleSource: Source = {
    id: '1',
    path: '/some/path',
    name: 'Test Source',
    comment: null,
    isEnabled: true,
    createdAt: new Date()
  }
  const sampleDTO: SourceDTO = {
    id: '1',
    path: '/some/path',
    name: 'Test Source',
    comment: null,
    isEnabled: true
  }
  const sampleCreateDTO: SourceCreateDTO = {
    path: '/some/path',
    name: 'Test Source',
    isEnabled: true
  }
  const sampleUpdateDTO: SourceUpdateDTO = {
    id: '1',
    path: '/some/path',
    name: 'Test Source',
    isEnabled: true
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('create', () => {
    it('returns null when a source with the same path already exists', async () => {
      mockFindOneBy.mockResolvedValue(sampleSource)

      const result = await SourcesRepo.create(sampleCreateDTO)

      expect(mockFindOneBy).toHaveBeenCalledWith({ path: sampleCreateDTO.path })
      expect(mockLog.error).toHaveBeenCalledWith(
        'Found an existing source with the same path',
        sampleSource
      )
      expect(result).toBeNull()
    })

    it('creates and saves a new source, returns mapped DTO', async () => {
      mockFindOneBy.mockResolvedValue(null)
      mockCreate.mockReturnValue(sampleSource)
      mockSave.mockResolvedValue(sampleSource)
      mockMap.mockReturnValue(sampleDTO)

      const result = await SourcesRepo.create(sampleCreateDTO)

      expect(mockFindOneBy).toHaveBeenCalledWith({ path: sampleCreateDTO.path })
      expect(mockCreate).toHaveBeenCalledWith(sampleCreateDTO)
      expect(mockSave).toHaveBeenCalledWith(sampleSource)
      expect(mockMap).toHaveBeenCalledWith(
        sampleSource,
        SOURCES_DTO_KEYS.Source,
        SOURCES_DTO_KEYS.SourceDTO
      )
      expect(result).toEqual(sampleDTO)
      expect(mockLog.success).toHaveBeenCalledWith('New source has been saved', sampleSource)
    })

    it('throws error when trying to create source with duplicate path due to database constraint', async () => {
      mockFindOneBy.mockResolvedValue(null)
      mockCreate.mockReturnValue(sampleSource)
      mockSave.mockRejectedValue(new Error('UNIQUE constraint failed: Source.path'))

      await expect(SourcesRepo.create(sampleCreateDTO)).rejects.toThrow(
        'Failed to create source in database'
      )

      expect(mockFindOneBy).toHaveBeenCalledWith({ path: sampleCreateDTO.path })
      expect(mockCreate).toHaveBeenCalledWith(sampleCreateDTO)
      expect(mockSave).toHaveBeenCalledWith(sampleSource)
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to create and save source:',
        'UNIQUE constraint failed: Source.path'
      )
    })

    it('throws error when trying to create source with duplicate name due to database constraint', async () => {
      const duplicateNameDTO: SourceCreateDTO = {
        path: '/different/path',
        name: sampleCreateDTO.name, // Same name as existing
        isEnabled: true
      }

      mockFindOneBy.mockResolvedValue(null)
      mockCreate.mockReturnValue(sampleSource)
      mockSave.mockRejectedValue(new Error('UNIQUE constraint failed: Source.name'))

      await expect(SourcesRepo.create(duplicateNameDTO)).rejects.toThrow(
        'Failed to create source in database'
      )

      expect(mockFindOneBy).toHaveBeenCalledWith({ path: duplicateNameDTO.path })
      expect(mockCreate).toHaveBeenCalledWith(duplicateNameDTO)
      expect(mockSave).toHaveBeenCalledWith(sampleSource)
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to create and save source:',
        'UNIQUE constraint failed: Source.name'
      )
    })
  })

  describe('getAll', () => {
    it('returns null when no sources exist', async () => {
      mockFind.mockResolvedValue([])

      const result = await SourcesRepo.getAll()

      expect(mockFind).toHaveBeenCalledWith({ order: { createdAt: 'ASC' } })
      expect(mockLog.error).toHaveBeenCalledWith('Sources are not found')
      expect(result).toBeNull()
    })

    it('returns mapped DTO array when sources exist', async () => {
      mockFind.mockResolvedValue([sampleSource])
      mockMapArray.mockReturnValue([sampleDTO])

      const result = await SourcesRepo.getAll()

      expect(mockFind).toHaveBeenCalledWith({ order: { createdAt: 'ASC' } })
      expect(mockMapArray).toHaveBeenCalledWith(
        [sampleSource],
        SOURCES_DTO_KEYS.Source,
        SOURCES_DTO_KEYS.SourceDTO
      )
      expect(result).toEqual([sampleDTO])
      expect(mockLog.success).toHaveBeenCalledWith('Sources are found')
    })
  })

  describe('update', () => {
    it('updates an existing source and returns mapped DTO', async () => {
      mockFindOne.mockResolvedValue(sampleSource)
      const merged = { ...sampleSource, ...sampleUpdateDTO }
      mockMerge.mockReturnValue(merged)
      mockSave.mockResolvedValue(merged)
      mockMap.mockReturnValue(sampleDTO)

      const result = await SourcesRepo.update(sampleUpdateDTO)

      expect(mockFindOne).toHaveBeenCalledWith({ where: { id: sampleUpdateDTO.id } })
      expect(mockMerge).toHaveBeenCalledWith(sampleSource, {
        ...sampleUpdateDTO,
        id: sampleSource.id
      })
      expect(mockSave).toHaveBeenCalledWith(merged)
      expect(mockMap).toHaveBeenCalledWith(
        merged,
        SOURCES_DTO_KEYS.Source,
        SOURCES_DTO_KEYS.SourceDTO
      )
      expect(result).toEqual(sampleDTO)
      expect(mockLog.success).toHaveBeenCalledWith('Source updated', merged)
    })

    it('returns null when no source is found', async () => {
      mockFindOne.mockResolvedValue(null)

      const result = await SourcesRepo.update(sampleUpdateDTO)

      expect(mockFindOne).toHaveBeenCalledWith({ where: { id: sampleUpdateDTO.id } })
      expect(mockLog.error).toHaveBeenCalledWith("Source wasn't found - update skipped")
      expect(result).toBeNull()
    })
  })

  describe('remove', () => {
    it('returns true when a source is successfully deleted', async () => {
      mockDelete.mockResolvedValue({ affected: 1 })

      const result = await SourcesRepo.remove({ id: '1' })

      expect(mockDelete).toHaveBeenCalledWith({ id: '1' })
      expect(mockLog.info).toHaveBeenCalledWith('Removing source with id', '1')
      expect(mockLog.info).toHaveBeenCalledWith('Deleted source by id 1')
      expect(result).toBe(true)
    })

    it('returns false when a source cannot be deleted', async () => {
      mockDelete.mockResolvedValue({ affected: 0 })

      const result = await SourcesRepo.remove({ id: '1' })

      expect(mockDelete).toHaveBeenCalledWith({ id: '1' })
      expect(mockLog.info).toHaveBeenCalledWith('Removing source with id', '1')
      expect(mockLog.error).toHaveBeenCalledWith('Source by id "1" is not deleted')
      expect(result).toBe(false)
    })
  })

  describe('checkUnique', () => {
    it('returns unique when no conflicts exist', async () => {
      mockFind.mockResolvedValue([])

      const result = await SourcesRepo.checkUnique(sampleCreateDTO)

      expect(mockFind).toHaveBeenCalledWith({
        where: [{ name: sampleCreateDTO.name }, { path: sampleCreateDTO.path }]
      })
      expect(result).toEqual({
        isUnique: true,
        conflicts: {
          name: false,
          path: false
        }
      })
      expect(mockLog.info).toHaveBeenCalledWith('Source is unique - no conflicts found')
    })

    it('returns name conflict when source with same name exists', async () => {
      const conflictingSource = { ...sampleSource, path: '/different/path' }
      mockFind.mockResolvedValue([conflictingSource])

      const result = await SourcesRepo.checkUnique(sampleCreateDTO)

      expect(mockFind).toHaveBeenCalledWith({
        where: [{ name: sampleCreateDTO.name }, { path: sampleCreateDTO.path }]
      })
      expect(result).toEqual({
        isUnique: false,
        conflicts: {
          name: true,
          path: false
        }
      })
      expect(mockLog.warn).toHaveBeenCalledWith('Source has conflicts', {
        name: true,
        path: false
      })
    })

    it('returns path conflict when source with same path exists', async () => {
      const conflictingSource = { ...sampleSource, name: 'Different Name' }
      mockFind.mockResolvedValue([conflictingSource])

      const result = await SourcesRepo.checkUnique(sampleCreateDTO)

      expect(mockFind).toHaveBeenCalledWith({
        where: [{ name: sampleCreateDTO.name }, { path: sampleCreateDTO.path }]
      })
      expect(result).toEqual({
        isUnique: false,
        conflicts: {
          name: false,
          path: true
        }
      })
      expect(mockLog.warn).toHaveBeenCalledWith('Source has conflicts', {
        name: false,
        path: true
      })
    })

    it('returns both conflicts when source with same name and path exists', async () => {
      mockFind.mockResolvedValue([sampleSource])

      const result = await SourcesRepo.checkUnique(sampleCreateDTO)

      expect(mockFind).toHaveBeenCalledWith({
        where: [{ name: sampleCreateDTO.name }, { path: sampleCreateDTO.path }]
      })
      expect(result).toEqual({
        isUnique: false,
        conflicts: {
          name: true,
          path: true
        }
      })
      expect(mockLog.warn).toHaveBeenCalledWith('Source has conflicts', {
        name: true,
        path: true
      })
    })

    it('throws error when database query fails', async () => {
      mockFind.mockRejectedValue(new Error('Database connection failed'))

      await expect(SourcesRepo.checkUnique(sampleCreateDTO)).rejects.toThrow(
        'Failed to check source Unique in database'
      )

      expect(mockFind).toHaveBeenCalledWith({
        where: [{ name: sampleCreateDTO.name }, { path: sampleCreateDTO.path }]
      })
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to check source Unique in database:',
        'Database connection failed'
      )
    })
  })
})
