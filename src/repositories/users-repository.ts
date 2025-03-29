import { prisma } from '../lib/prisma'
import { CreateUserDTO, UpdateUserDTO, User } from '../dtos/user'
import bcryptjs from 'bcryptjs'
import { IUsersRepository } from '../interfaces/IUsersRepository'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export class UsersRepository implements IUsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await bcryptjs.hash(data.password, 6)
      }
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })

    return user
  }

  async findAll(): Promise<User[]> {
    const users = await prisma.user.findMany()
    return users
  }

  async update(id: string, data: UpdateUserDTO): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id },
        data
      })
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') return null
      throw error
    }
  }

  async delete(id: string): Promise<User | null> {
    try {
      const user = await prisma.user.delete({
        where: { id }
      })
      return user
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') return null
      throw error
    }
  }
} 