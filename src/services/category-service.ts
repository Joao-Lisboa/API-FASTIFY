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

    if (!category) {
      throw new Error('Failed to find category')
    }

    return category
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category | null> {
    const category = await this.categoryRepository.update(id, data)

    if (!category) {
      throw new Error('Failed to update category')
    }

    return category
  }

  async delete(id: string): Promise<Category | null> {
    const category = await this.categoryRepository.delete(id)

    if (!category) {
      throw new Error('Failed to delete category')
    }

    return category
  }
}
