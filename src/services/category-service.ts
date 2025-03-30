import { CreateCategoryDTO, UpdateCategoryDTO } from "@/dtos/category";

import { Category } from "@/dtos/category";
import { ICategoriesRepository } from "@/interfaces/ICategoriesRepository";

export class CategoryService {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.create(data)

    if (!category) {
      throw new Error('Failed to create category')
    }

    return category
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.findAll()

    if (!categories) {
      throw new Error('Failed to find categories')
    }

    return categories
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.findById(id)

    return category
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category | null> {
    const category = await this.categoryRepository.update(id, data)

    return category
  }

  async delete(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.delete(id)

    return category
  }
}
