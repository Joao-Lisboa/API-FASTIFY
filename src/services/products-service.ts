import { CreateProductDTO, Product, UpdateProductDTO } from "@/dtos/products";
import { IProductsRepository } from "@/interfaces/IProductsRepository";

export class ProductsService {
  constructor(private productsRepository: IProductsRepository) {}

  async create(data: CreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create(data)

    return product
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.findAll()

    return products
  }

  async findById(id: string): Promise<Product[]> {
    const product = await this.productsRepository.findById(id)

    return product
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await this.productsRepository.findByCategory(categoryId)

    return products
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product | null> {
    const product = await this.productsRepository.update(id, data)

    return product
  }

  async delete(id: string): Promise<Product | null> {
    const product = await this.productsRepository.delete(id)

    return product
  }
}
