import { z } from "zod"

export type Product = {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  stock: number
  createdAt: Date
  updatedAt: Date
}

export const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string(),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
  stock: z.number().int().min(0)
})

export const updateProductSchema = createProductSchema.partial()


export type CreateProductDTO = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>

