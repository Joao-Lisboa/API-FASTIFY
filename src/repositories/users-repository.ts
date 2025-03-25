import { prisma } from '../lib/prisma'
import { CreateUserDTO, User } from '../dtos/user'

export class UsersRepository {
  async create(data: CreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data
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
} 