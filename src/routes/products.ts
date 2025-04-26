import { FastifyInstance } from "fastify";
import { ProductsController } from "../controllers/products-controller";
import { ProductsService } from "../services/products-service";
import { ProductsRepository } from "../repositories/products-repository";
import { authMiddleware } from '../middlewares/auth'

export async function productsRoutes(app: FastifyInstance) {
  const productsRepository = new ProductsRepository()
  const productsService = new ProductsService(productsRepository)
  const productsController = new ProductsController(productsService)

  // Todas as rotas de produtos são protegidas
  app.post('/products', { preHandler: authMiddleware }, (req, reply) => productsController.create(req, reply))
  app.get('/products', { preHandler: authMiddleware }, (req, reply) => productsController.findAll(req, reply))
  app.get('/products/:id', { preHandler: authMiddleware }, (req, reply) => productsController.findById(req, reply))
  app.get('/products/category/:categoryId', { preHandler: authMiddleware }, (req, reply) => productsController.findByCategory(req, reply))
  app.put('/products/:id', { preHandler: authMiddleware }, (req, reply) => productsController.update(req, reply))
  app.delete('/products/:id', { preHandler: authMiddleware }, (req, reply) => productsController.delete(req, reply))
}

