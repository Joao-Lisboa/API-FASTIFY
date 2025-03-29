import { CreateProductDTO, Product, UpdateProductDTO } from "@/dtos/products";

export interface IProductsRepository {
  create(data: CreateProductDTO): Promise<Product>
  findById(id: string): Promise<Product[]>
  findAll(): Promise<Product[]>
  findByCategory(categoryId: string): Promise<Product[]>
  update(id: string, data: UpdateProductDTO): Promise<Product | null>
  delete(id: string): Promise<Product | null>
}
