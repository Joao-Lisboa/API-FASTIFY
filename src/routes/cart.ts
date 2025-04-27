import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { CartsController } from '../controllers/carts-controller'
import { CartsService } from '../services/carts-service'
import { CartsRepository } from '../repositories/carts-repository'
import { ProductsRepository } from '../repositories/products-repository'

export async function cartRoutes(app: FastifyInstance) {
  const cartsRepository = new CartsRepository()
  const productsRepository = new ProductsRepository()
  const cartsService = new CartsService(cartsRepository, productsRepository)
  const cartsController = new CartsController(cartsService)

  // Adiciona middleware de autenticação para todas as rotas
  app.addHook('onRequest', async (request) => {
    try {
      console.log('Verificando autenticação...')
      await request.jwtVerify()
      console.log('Usuário autenticado:', request.user)
    } catch (error) {
      console.error('Erro na autenticação:', error)
      throw error
    }
  })

  app.post('/cart/items', (req: FastifyRequest<{
    Body: {
      productId: string
      quantity: number
    }
  }>, reply: FastifyReply) => cartsController.addToCart(req, reply))
  app.put('/cart/items/:itemId', (req: FastifyRequest<{
    Params: {
      itemId: string
    },
    Body: {
      quantity: number
    }
  }>, reply: FastifyReply) => cartsController.updateCartItem(req, reply))
  app.delete('/cart/items/:itemId', (req: FastifyRequest<{
    Params: {
      itemId: string
    }
  }>, reply: FastifyReply) => cartsController.removeCartItem(req, reply))
  app.delete('/cart', (req: FastifyRequest, reply: FastifyReply) => cartsController.clearCart(req, reply))
  app.get('/cart', (req: FastifyRequest, reply: FastifyReply) => cartsController.getCart(req, reply))
} 