import { z } from 'zod'

export const addToCartSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive()
})

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive()
})

export type Cart = {
  id: string
  userId: string
  items: CartItem[]
  createdAt: Date
  updatedAt: Date
}

export type CartItem = {
  id: string
  cartId: string
  productId: string
  quantity: number
  createdAt: Date
  updatedAt: Date
}

export type AddToCartDTO = z.infer<typeof addToCartSchema>
export type UpdateCartItemDTO = z.infer<typeof updateCartItemSchema> 