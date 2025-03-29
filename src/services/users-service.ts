import { User } from '../dtos/user'
import { IUsersRepository } from '../interfaces/IUsersRepository'
import { IUsersService } from '../interfaces/IUsersService'

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists with this email.')
  }
}

export class UsersService implements IUsersService {
  constructor(private usersRepository: IUsersRepository) {}

  async create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create(data)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email)
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id)
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll()
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const user = await this.usersRepository.update(id, data)

    return user
  }

  async delete(id: string): Promise<User | null> {
    return this.usersRepository.delete(id)
  }
} 