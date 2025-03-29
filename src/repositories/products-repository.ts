import { CreateProductDTO, Product, UpdateProductDTO } from "@/dtos/products";
import { IProductsRepository } from "../interfaces/IProductsRepository";
import { prisma } from "@/lib/prisma";

export class ProductsRepository implements IProductsRepository {
  async create(data: CreateProductDTO): Promise<Product> {
    const product = await prisma.product.create({
      data
    })
    return product
  }

  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany()
    return products
  } 

  async findById(id: string): Promise<Product[]> {
    const product = await prisma.product.findMany({ where: { id } })
    return product
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({ where: { categoryId } })
    return products
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const product = await prisma.product.update({ where: { id }, data })
    return product
  }

  async delete(id: string): Promise<Product | null> {
    const product = await prisma.product.delete({ where: { id } })
    return product
  }
}