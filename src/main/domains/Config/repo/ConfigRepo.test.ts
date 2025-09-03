import { IsNull, Not } from 'typeorm'

import { ConsolaInstance } from 'consola'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { CONFIG_DTO_KEYS, ConfigDTO, ConfigUpdateDTO } from '@shared/domains/Config/Config.dtos'

import { Config } from '../entities/Config'

// Hoisted mock repository
const mockRepository = vi.hoisted(() => ({
  findOne: vi.fn(),
  create: vi.fn(),
  save: vi.fn(),
  merge: vi.fn()
}))

// Hoisted mocks to ensure they're available before module imports
vi.mock('electron', () => ({
  app: {
    getPath: vi.fn((name: string) => {
      const paths = {
        documents: '/mock/documents',
        userData: '/mock/userData',
        cache: '/mock/cache'
      }
      return paths[name as keyof typeof paths] || '/mock/default'
    })
  }
}))

vi.mock('@main/database/AppDataSource', () => ({
  AppDataSource: {
    getRepository: vi.fn(() => mockRepository)
  }
}))

vi.mock('@main/domains/Config/mappers/ConfigMapper', () => ({
  ConfigMapper: {
    map: vi.fn()
  }
}))

vi.mock('@shared/utils/logs/createLog', () => ({
  createLog: vi.fn()
}))

// Import after mocks are set up
import { ConfigMapper } from '@main/domains/Config/mappers/ConfigMapper'

import { createLog } from '@shared/utils/logs/createLog'

import { ConfigRepo } from './ConfigRepo'

describe('ConfigRepo', () => {
  // Mock logger type - subset of ConsolaInstance methods used in tests
  type MockLogger = Pick<ConsolaInstance, 'error' | 'warn' | 'info' | 'success'>

  // Mock logger
  const mockLog: MockLogger = {
    error: Object.assign(vi.fn(), { raw: vi.fn() }),
    warn: Object.assign(vi.fn(), { raw: vi.fn() }),
    info: Object.assign(vi.fn(), { raw: vi.fn() }),
    success: Object.assign(vi.fn(), { raw: vi.fn() })
  }

  // Sample data
  const mockConfig: Partial<Config> = {
    id: '1',
    outputFolder: '/output',
    tempFolder: '/temp',
    maxThreads: 4,
    autoProcessOnScan: false,
    autoArchiveOnComplete: false,
    useMultithreading: true,
    debugMode: false,
    createdAt: new Date()
  }

  const mockConfigDTO: ConfigDTO = {
    outputFolder: '/output',
    tempFolder: '/temp',
    maxThreads: 4,
    autoProcessOnScan: false,
    autoArchiveOnComplete: false,
    useMultithreading: true,
    debugMode: false
  }

  const mockUpdateDTO: ConfigUpdateDTO = {
    outputFolder: '/new-output',
    maxThreads: 8
  }

  beforeEach(() => {
    // Clear all mocks
    vi.clearAllMocks()

    // Setup logger mock
    vi.mocked(createLog).mockReturnValue(mockLog as ConsolaInstance)

    // Setup mapper mock
    vi.mocked(ConfigMapper.map).mockReturnValue(mockConfigDTO)
  })

  describe('get()', () => {
    it('should return existing config from repository', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(mockConfig)

      // Act
      const result = await ConfigRepo.get()

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: Not(IsNull()) }
      })
      expect(ConfigMapper.map).toHaveBeenCalledWith(
        mockConfig,
        CONFIG_DTO_KEYS.Config,
        CONFIG_DTO_KEYS.ConfigDTO
      )
      expect(result).toEqual(mockConfigDTO)
      expect(mockLog.info).toHaveBeenCalledWith('Existing config retrieved', mockConfig)
      expect(mockLog.info).toHaveBeenCalledWith('Mapped config to DTO', mockConfigDTO)
    })

    it('should create new config when none exists', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null)
      mockRepository.create.mockReturnValue(mockConfig)
      mockRepository.save.mockResolvedValue(mockConfig)

      // Act
      const result = await ConfigRepo.get()

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: Not(IsNull()) }
      })
      expect(mockRepository.create).toHaveBeenCalledWith()
      expect(mockRepository.save).toHaveBeenCalledWith(mockConfig)
      expect(ConfigMapper.map).toHaveBeenCalledWith(
        mockConfig,
        CONFIG_DTO_KEYS.Config,
        CONFIG_DTO_KEYS.ConfigDTO
      )
      expect(result).toEqual(mockConfigDTO)
      expect(mockLog.warn).toHaveBeenCalledWith('No config found — creating new default config')
      expect(mockLog.success).toHaveBeenCalledWith('New default config saved', mockConfig)
    })

    it('should throw error when database query fails', async () => {
      // Arrange
      const dbError = new Error('Database connection failed')
      mockRepository.findOne.mockRejectedValue(dbError)

      // Act & Assert
      await expect(ConfigRepo.get()).rejects.toThrow('Error getting configuration from database')
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to query config from database:',
        'Database connection failed'
      )
    })

    it('should throw error when creating new config fails', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(null)
      mockRepository.create.mockReturnValue(mockConfig)
      const saveError = new Error('Save failed')
      mockRepository.save.mockRejectedValue(saveError)

      // Act & Assert
      await expect(ConfigRepo.get()).rejects.toThrow('Failed to create new configuration')
      expect(mockLog.error).toHaveBeenCalledWith('Failed to create new config:', 'Save failed')
    })

    it('should throw error when mapping fails', async () => {
      // Arrange
      mockRepository.findOne.mockResolvedValue(mockConfig)
      const mappingError = new Error('Mapping failed')
      vi.mocked(ConfigMapper.map).mockImplementation(() => {
        throw mappingError
      })

      // Act & Assert
      await expect(ConfigRepo.get()).rejects.toThrow('Failed to map config')
      expect(mockLog.error).toHaveBeenCalledWith('Failed to map config to DTO:', 'Mapping failed')
    })
  })

  describe('update()', () => {
    it('should update existing config successfully', async () => {
      // Arrange
      const mergedConfig = { ...mockConfig, ...mockUpdateDTO }
      mockRepository.findOne.mockResolvedValue(mockConfig)
      mockRepository.merge.mockReturnValue(mergedConfig)
      mockRepository.save.mockResolvedValue(mergedConfig)

      // Act
      const result = await ConfigRepo.update(mockUpdateDTO)

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: Not(IsNull()) }
      })
      expect(mockRepository.merge).toHaveBeenCalledWith(mockConfig, {
        ...mockConfig,
        ...mockUpdateDTO
      })
      expect(mockRepository.save).toHaveBeenCalledWith(mergedConfig)
      expect(ConfigMapper.map).toHaveBeenCalledWith(
        mergedConfig,
        CONFIG_DTO_KEYS.Config,
        CONFIG_DTO_KEYS.ConfigDTO
      )
      expect(result).toEqual(mockConfigDTO)
      expect(mockLog.info).toHaveBeenCalledWith('Updating config with payload', mockUpdateDTO)
      expect(mockLog.info).toHaveBeenCalledWith('Existing config found — merging changes')
      expect(mockLog.success).toHaveBeenCalledWith('Config saved successfully', mergedConfig)
    })

    it('should create new config when none exists', async () => {
      // Arrange
      const newConfig = { ...mockConfig, ...mockUpdateDTO }
      mockRepository.findOne.mockResolvedValue(null)
      mockRepository.create.mockReturnValue(newConfig)
      mockRepository.save.mockResolvedValue(newConfig)

      // Act
      const result = await ConfigRepo.update(mockUpdateDTO)

      // Assert
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: Not(IsNull()) }
      })
      expect(mockRepository.create).toHaveBeenCalledWith(mockUpdateDTO)
      expect(mockRepository.save).toHaveBeenCalledWith(newConfig)
      expect(ConfigMapper.map).toHaveBeenCalledWith(
        newConfig,
        CONFIG_DTO_KEYS.Config,
        CONFIG_DTO_KEYS.ConfigDTO
      )
      expect(result).toEqual(mockConfigDTO)
      expect(mockLog.warn).toHaveBeenCalledWith('Config not found — creating a new one')
    })

    it('should throw error when fetching from database fails', async () => {
      // Arrange
      const fetchError = new Error('Database fetch failed')
      mockRepository.findOne.mockRejectedValue(fetchError)

      // Act & Assert
      await expect(ConfigRepo.update(mockUpdateDTO)).rejects.toThrow(
        'Failed to fetch config from the database'
      )
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to fetch existing config from database:',
        'Database fetch failed'
      )
    })

    it('should throw error when saving fails', async () => {
      // Arrange
      const mergedConfig = { ...mockConfig, ...mockUpdateDTO }
      mockRepository.findOne.mockResolvedValue(mockConfig)
      mockRepository.merge.mockReturnValue(mergedConfig)
      const saveError = new Error('Save operation failed')
      mockRepository.save.mockRejectedValue(saveError)

      // Act & Assert
      await expect(ConfigRepo.update(mockUpdateDTO)).rejects.toThrow(
        'Failed to save config to the database'
      )
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to save config to database:',
        'Save operation failed'
      )
    })

    it('should throw error when mapping fails', async () => {
      // Arrange
      const mergedConfig = { ...mockConfig, ...mockUpdateDTO }
      mockRepository.findOne.mockResolvedValue(mockConfig)
      mockRepository.merge.mockReturnValue(mergedConfig)
      mockRepository.save.mockResolvedValue(mergedConfig)
      const mappingError = new Error('Mapping operation failed')
      vi.mocked(ConfigMapper.map).mockImplementation(() => {
        throw mappingError
      })

      // Act & Assert
      await expect(ConfigRepo.update(mockUpdateDTO)).rejects.toThrow('Failed to map saved config')
      expect(mockLog.error).toHaveBeenCalledWith(
        'Failed to map saved config:',
        'Mapping operation failed'
      )
    })
  })
})
