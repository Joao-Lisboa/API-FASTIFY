import { Cart, CartItem, AddToCartDTO, UpdateCartItemDTO } from '../dtos/cart'
import { ICartsRepository } from '../interfaces/ICartsRepository'
import { IProductsRepository } from '../interfaces/IProductsRepository'

export class ProductNotFoundError extends Error {
  constructor() {
    super('Product not found.')
  }
}

export class CartItemNotFoundError extends Error {
  constructor() {
    super('Cart item not found.')
  }
}

export class InsufficientStockError extends Error {
  constructor() {
    super('Insufficient stock for this product.')
  }
}

export class CartsService {
  constructor(
    private cartsRepository: ICartsRepository,
    private productsRepository: IProductsRepository
  ) {}

  async getOrCreateCart(userId: string): Promise<Cart> {
    let cart = await this.cartsRepository.findByUserId(userId)
    if (!cart) {
      cart = await this.cartsRepository.create(userId)
    }
    return cart
  }

  async addToCart(userId: string, data: AddToCartDTO): Promise<CartItem> {
    const product = await this.productsRepository.findById(data.productId)
    if (!product || product.length === 0) {
      throw new ProductNotFoundError()
    }

    if (product[0].stock < data.quantity) {
      throw new InsufficientStockError()
    }

    const cart = await this.getOrCreateCart(userId)
    return this.cartsRepository.addItem(cart.id, data)
  }

  async updateCartItem(itemId: string, data: UpdateCartItemDTO): Promise<CartItem> {
    const item = await this.cartsRepository.findItemById(itemId)
    if (!item) {
      throw new CartItemNotFoundError()
    }

    const product = await this.productsRepository.findById(item.productId)
    if (!product) {
      throw new ProductNotFoundError()
    }

    if (product[0].stock < data.quantity) {
      throw new InsufficientStockError()
    }

    const updatedItem = await this.cartsRepository.updateItem(itemId, data.quantity)
    if (!updatedItem) {
      throw new CartItemNotFoundError()
    }

    return updatedItem
  }

  async removeCartItem(itemId: string): Promise<void> {
    const item = await this.cartsRepository.removeItem(itemId)
    if (!item) {
      throw new CartItemNotFoundError()
    }
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.getOrCreateCart(userId)
    await this.cartsRepository.clear(cart.id)
  }

  async getCart(userId: string): Promise<Cart | null> {
    return this.cartsRepository.findByUserId(userId)
  }
} 