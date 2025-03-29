import { Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/dtos/category";
import { ICategoriesRepository } from "../interfaces/ICategoriesRepository";
import { prisma } from "@/lib/prisma";

export class CategoryRepository implements ICategoriesRepository {
  async create(data: CreateCategoryDTO): Promise<Category> {
    const category = await prisma.category.create({ data })
    return category
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({ where: { id } })
    return category
  }

  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    return categories
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category | null> {
    const category = await prisma.category.update({ where: { id }, data })
    return category
  }

  async delete(id: string): Promise<Category | null> {
    const category = await prisma.category.delete({ where: { id } })
    return category
  }
}