import { prisma } from '../lib/prisma'
import { Cart, CartItem } from '../dtos/cart'
import { ICartsRepository } from '../interfaces/ICartsRepository'

export class CartsRepository implements ICartsRepository {
  async findByUserId(userId: string): Promise<Cart | null> {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    return cart
  }

  async create(userId: string): Promise<Cart> {
    const cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: true
      }
    })
    return cart
  }

  async addItem(cartId: string, data: { productId: string; quantity: number }): Promise<CartItem> {
    const item = await prisma.cartItem.create({
      data: {
        cartId,
        ...data
      }
    })
    return item
  }

  async updateItem(itemId: string, quantity: number): Promise<CartItem | null> {
    try {
      const item = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity }
      })
      return item
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') return null
      throw error
    }
  }

  async removeItem(itemId: string): Promise<CartItem | null> {
    try {
      const item = await prisma.cartItem.delete({
        where: { id: itemId }
      })
      return item
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code === 'P2025') return null
      throw error
    }
  }

  async clear(cartId: string): Promise<void> {
    await prisma.cartItem.deleteMany({
      where: { cartId }
    })
  }

  async findItemById(itemId: string): Promise<CartItem | null> {
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId }
    })
    return item
  }
} 