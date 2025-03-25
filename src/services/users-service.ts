import { CreateUserDTO, User } from '../dtos/user'
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
} 