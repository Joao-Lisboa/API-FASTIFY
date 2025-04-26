import { Cart, CartItem } from '../dtos/cart'

export interface ICartsRepository {
  findByUserId(userId: string): Promise<Cart | null>
  create(userId: string): Promise<Cart>
  addItem(cartId: string, data: { productId: string; quantity: number }): Promise<CartItem>
  updateItem(itemId: string, quantity: number): Promise<CartItem | null>
  removeItem(itemId: string): Promise<CartItem | null>
  clear(cartId: string): Promise<void>
  findItemById(itemId: string): Promise<CartItem | null>
} 