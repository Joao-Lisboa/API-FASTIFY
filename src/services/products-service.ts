import { CreateProductDTO, Product, UpdateProductDTO } from "@/dtos/products";
import { IProductsRepository } from "@/interfaces/IProductsRepository";

export class ProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create(data)

    if (!product) {
      throw new Error('Failed to create product')
    }

    return product
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.findAll()

    if (!products) {
      throw new Error('Failed to find products')
    }

    return products
  }

  async findById(id: string): Promise<Product[]> {
    const product = await this.productsRepository.findById(id)

    if (!product) {
      throw new Error('Failed to find product')
    }

    return product
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productsRepository.findByCategory(categoryId)

    if (!products) {
      throw new Error('Failed to find products')
    }

    return products
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const product = await this.productsRepository.update(id, data)

    if (!product) {
      throw new Error('Failed to update product')
    }

    return product
  }

  async delete(id: string): Promise<Product | null> {
    const product = await this.productsRepository.delete(id)

    if (!product) {
      throw new Error('Failed to delete product')
    }

    return product
  }
}
