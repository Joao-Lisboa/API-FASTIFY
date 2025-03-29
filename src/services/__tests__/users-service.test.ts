import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UsersService, UserAlreadyExistsError } from '../users-service'
import { IUsersRepository } from '../../interfaces/IUsersRepository'

describe('UsersService', () => {
  let usersService: UsersService
  let usersRepository: IUsersRepository

  beforeEach(() => {
    usersRepository = {
      create: vi.fn(),
      findByEmail: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
      delete: vi.fn()
    }

    usersService = new UsersService(usersRepository)
  })

  describe('create', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      }

      const createdUser = {
        id: '1',
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.findByEmail).mockResolvedValue(null)
      vi.mocked(usersRepository.create).mockResolvedValue(createdUser)

      const result = await usersService.create(userData)

      expect(result).toEqual(createdUser)
      expect(usersRepository.findByEmail).toHaveBeenCalledWith(userData.email)
      expect(usersRepository.create).toHaveBeenCalled()
    })

    it('should throw UserAlreadyExistsError when email already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: '123456'
      }

      const existingUser = {
        id: '1',
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.findByEmail).mockResolvedValue(existingUser)

      await expect(usersService.create(userData)).rejects.toThrow(UserAlreadyExistsError)
    })
  })

  describe('findByEmail', () => {
    it('should return user when found', async () => {
      const user = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.findByEmail).mockResolvedValue(user)

      const result = await usersService.findByEmail('test@example.com')

      expect(result).toEqual(user)
      expect(usersRepository.findByEmail).toHaveBeenCalledWith('test@example.com')
    })

    it('should return null when user not found', async () => {
      vi.mocked(usersRepository.findByEmail).mockResolvedValue(null)

      const result = await usersService.findByEmail('nonexistent@example.com')

      expect(result).toBeNull()
    })
  })

  describe('findById', () => {
    it('should return user when found', async () => {
      const user = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.findById).mockResolvedValue(user)

      const result = await usersService.findById('1')

      expect(result).toEqual(user)
      expect(usersRepository.findById).toHaveBeenCalledWith('1')
    })

    it('should return null when user not found', async () => {
      vi.mocked(usersRepository.findById).mockResolvedValue(null)

      const result = await usersService.findById('nonexistent-id')

      expect(result).toBeNull()
    })
  })

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateData = {
        name: 'Updated Name',
        email: 'updated@example.com'
      }

      const updatedUser = {
        id: '1',
        ...updateData,
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.update).mockResolvedValue(updatedUser)

      const result = await usersService.update('1', updateData)

      expect(result).toEqual(updatedUser)
      expect(usersRepository.update).toHaveBeenCalledWith('1', updateData)
    })

    it('should return null when user not found', async () => {
      vi.mocked(usersRepository.update).mockResolvedValue(null)

      const result = await usersService.update('nonexistent-id', {
        name: 'Updated Name'
      })

      expect(result).toBeNull()
    })
  })

  describe('delete', () => {
    it('should delete user successfully', async () => {
      const deletedUser = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        password: '123456',
        createdAt: new Date(),
        updatedAt: new Date()
      }

      vi.mocked(usersRepository.delete).mockResolvedValue(deletedUser)

      const result = await usersService.delete('1')

      expect(result).toEqual(deletedUser)
      expect(usersRepository.delete).toHaveBeenCalledWith('1')
    })

    it('should return null when user not found', async () => {
      vi.mocked(usersRepository.delete).mockResolvedValue(null)

      const result = await usersService.delete('nonexistent-id')

      expect(result).toBeNull()
    })
  })
}) 