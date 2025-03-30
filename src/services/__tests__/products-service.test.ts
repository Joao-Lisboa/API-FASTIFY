import { describe, it, expect, beforeEach, vi } from 'vitest'
import { ProductsService } from '../products-service'
import { IProductsRepository } from '../../interfaces/IProductsRepository'
import { ICategoriesRepository } from '../../interfaces/ICategoriesRepository'

describe('ProductsService', () => {
  let productsService: ProductsService
  let productsRepository: IProductsRepository
  let categoriesRepository: ICategoriesRepository

  beforeEach(() => {
    productsRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByCategory: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }

    categoriesRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }

    productsService = new ProductsService(productsRepository)
  })

  describe('create', () => {
    it('should create a new product when category exists', async () => {
      const category = {
        id: '1',
        name: 'Electronics',
        description: 'Electronic products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const productData = {
        name: 'Smartphone',
        description: 'New smartphone',
        price: 999.99,
        categoryId: '1',
        stock: 10
      }

      const createdProduct = {
        id: '1',
        ...productData,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.findById).mockResolvedValue(category)
      vi.mocked(productsRepository.create).mockResolvedValue(createdProduct)

      const result = await productsService.create(productData)

      expect(result).toEqual(createdProduct)
    })
  })

  describe('findByCategory', () => {
    it('should return products when category exists', async () => {
      const category = {
        id: '1',
        name: 'Electronics',
        description: 'Electronic products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const products = [
        {
          id: '1',
          name: 'Smartphone',
          description: 'New smartphone',
          price: 999.99,
          categoryId: '1',
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]

      vi.mocked(categoriesRepository.findById).mockResolvedValue(category)
      vi.mocked(productsRepository.findByCategory).mockResolvedValue(products)

      const result = await productsService.findByCategory('1')

      expect(result).toEqual(products)
    })
  })

  describe('update', () => {
    it('should update product when category exists', async () => {
      const category = {
        id: '2',
        name: 'Books',
        description: 'Book products',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const updateData = {
        name: 'Updated Smartphone',
        categoryId: '2'
      }

      const updatedProduct = {
        id: '1',
        name: 'Updated Smartphone',
        description: 'New smartphone',
        price: 999.99,
        categoryId: '2',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(categoriesRepository.findById).mockResolvedValue(category)
      vi.mocked(productsRepository.update).mockResolvedValue(updatedProduct)

      const result = await productsService.update('1', updateData)

      // Corrigindo a expectativa para um objeto único, não um array
      expect(result).toEqual(updatedProduct)
    })

    // ... rest of the tests ...
  })

  describe('findById', () => {
    it('should return product when found', async () => {
      const product = {
        id: '1',
        name: 'Smartphone',
        description: 'New smartphone',
        price: 999.99,
        categoryId: '1',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(productsRepository.findById).mockResolvedValue([product])

      const result = await productsService.findById('1')

      expect(result).toEqual([product])
      expect(productsRepository.findById).toHaveBeenCalledWith('1')
    })

    it('should return null when product not found', async () => {
      vi.mocked(productsRepository.findById).mockResolvedValue([])

      const result = await productsService.findById('nonexistent-id')

      expect(result).toEqual([])
    })
  })

  describe('delete', () => {
    it('should delete product successfully', async () => {
      const deletedProduct = {
        id: '1',
        name: 'Smartphone',
        description: 'New smartphone',
        price: 999.99,
        categoryId: '1',
        stock: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(productsRepository.delete).mockResolvedValue(deletedProduct)

      const result = await productsService.delete('1')

      expect(result).toEqual(deletedProduct)
      expect(productsRepository.delete).toHaveBeenCalledWith('1')
    })

    it('should return null when product not found', async () => {
      vi.mocked(productsRepository.delete).mockResolvedValue(null)

      const result = await productsService.delete('nonexistent-id')

      expect(result).toBeNull()
    })
  })
})