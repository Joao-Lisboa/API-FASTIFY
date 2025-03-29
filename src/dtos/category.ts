import { z } from 'zod'

export type Category = {
    id: string
    name: string
    description: string
    createdAt: Date
    updatedAt: Date
  }

export const createCategorySchema = z.object({
  name: z.string().min(3),
  description: z.string()
})

export const updateCategorySchema = createCategorySchema.partial()

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>