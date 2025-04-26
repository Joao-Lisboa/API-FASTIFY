import { FastifyInstance } from 'fastify'
import { CartsController } from '../controllers/carts-controller'
import { CartsService } from '../services/carts-service'
import { CartsRepository } from '../repositories/carts-repository'
import { ProductsRepository } from '../repositories/products-repository'

export async function cartRoutes(app: FastifyInstance) {
  const cartsRepository = new CartsRepository()
  const productsRepository = new ProductsRepository()
  const cartsService = new CartsService(cartsRepository, productsRepository)
  const cartsController = new CartsController(cartsService)

  app.post<{ Body: { productId: string; quantity: number } }>('/cart/items', (req, reply) => cartsController.addToCart(req, reply))
  app.put('/cart/items/:itemId', (req, reply) => cartsController.updateCartItem(req, reply))
  app.delete('/cart/items/:itemId', (req, reply) => cartsController.removeCartItem(req, reply))
  app.delete('/cart', (req, reply) => cartsController.clearCart(req, reply))
  app.get('/cart', (req, reply) => cartsController.getCart(req, reply))
} 