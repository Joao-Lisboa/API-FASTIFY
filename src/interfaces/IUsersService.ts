import { User, LoginDTO } from '../dtos/user'

export interface IUsersService {
  create(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  findAll(): Promise<User[]>
  update(id: string, data: Partial<User>): Promise<User | null>
  delete(id: string): Promise<User | null>
  login(data: LoginDTO): Promise<Omit<User, 'password'>>
} 