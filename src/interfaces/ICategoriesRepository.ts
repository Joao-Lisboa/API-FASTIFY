import { Category, CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category'

export interface ICategoriesRepository {
  create(data: CreateCategoryDTO): Promise<Category>
  findById(id: string): Promise<Category | null>
  findAll(): Promise<Category[]>
  update(id: string, data: UpdateCategoryDTO): Promise<Category | null>
  delete(id: string): Promise<Category | null>
}