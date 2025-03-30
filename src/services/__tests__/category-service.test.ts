import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CategoryService } from '../category-service'
import { ICategoriesRepository } from '../../interfaces/ICategoriesRepository'

describe('CategoriesService', () => {
  let categoriesService: CategoryService
  let categoriesRepository: ICategoriesRepository

  beforeEach(() => {
    categoriesRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }

    categoriesService = new CategoryService(categoriesRepository)
  })

  describe('create', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'Electronics',
        description: 'Electronic products'
      }

      const createdCategory = {
        id: '1',
        ...categoryData,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.create).mockResolvedValue(createdCategory)

      const result = await categoriesService.create(categoryData)

      expect(result).toEqual(createdCategory)
      expect(categoriesRepository.create).toHaveBeenCalledWith(categoryData)
    })
  })

  describe('findById', () => {
    it('should return category when found', async () => {
      const category = {
        id: '1',
        name: 'Electronics',
        description: 'Electronic products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.findById).mockResolvedValue(category)

      const result = await categoriesService.findById('1')

      expect(result).toEqual(category)
      expect(categoriesRepository.findById).toHaveBeenCalledWith('1')
    })

    it('should return null when category not found', async () => {
      vi.mocked(categoriesRepository.findById).mockResolvedValue(null)

      const result = await categoriesService.findById('nonexistent-id')

      expect(result).toBeNull()
    })
  })

  describe('findAll', () => {
    it('should return all categories', async () => {
      const categories = [
        {
          id: '1',
          name: 'Electronics',
          description: 'Electronic products',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: '2',
          name: 'Books',
          description: 'Book products',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      vi.mocked(categoriesRepository.findAll).mockResolvedValue(categories)

      const result = await categoriesService.findAll()

      expect(result).toEqual(categories)
      expect(categoriesRepository.findAll).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should update category successfully', async () => {
      const updateData = {
        name: 'Updated Electronics'
      }

      const updatedCategory = {
        id: '1',
        name: 'Updated Electronics',
        description: 'Electronic products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.update).mockResolvedValue(updatedCategory)

      const result = await categoriesService.update('1', updateData)

      expect(result).toEqual(updatedCategory)
      expect(categoriesRepository.update).toHaveBeenCalledWith('1', updateData)
    })

    it('should return null when category not found', async () => {
      vi.mocked(categoriesRepository.update).mockResolvedValue(null)

      const result = await categoriesService.update('nonexistent-id', {
        name: 'Updated Name'
      })

      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('should delete category successfully', async () => {
      const deletedCategory = {
        id: '1',
        name: 'Electronics',
        description: 'Electronic products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.delete).mockResolvedValue(deletedCategory)

      const result = await categoriesService.delete('1')

      expect(result).toEqual(deletedCategory)
      expect(categoriesRepository.delete).toHaveBeenCalledWith('1')
    })

    it('should return null when category not found', async () => {
      vi.mocked(categoriesRepository.delete).mockResolvedValue(null)

      const result = await categoriesService.delete('nonexistent-id')

      expect(result).toBeNull()
    })
  })
})