import { CreateUserDTO, UpdateUserDTO, User } from '../dtos/user'
import { UsersRepository } from '../repositories/users-repository'

export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User already exists with this email.')
  }
}

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(data.email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create(data)

    return user
  }

  async getUserById(id: string): Promise<User | null> {
    return this.usersRepository.findById(id)
  }

  async getAllUsers(): Promise<User[]> {
    return this.usersRepository.findAll()
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.usersRepository.update(id, data)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }
} 