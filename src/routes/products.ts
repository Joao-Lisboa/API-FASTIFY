import { FastifyInstance } from "fastify";
import { ProductsController } from "../controllers/products-controller";
import { ProductsService } from "../services/products-service";
import { ProductsRepository } from "../repositories/products-repository";

export async function productsRoutes(app: FastifyInstance) {
  const productsRepository = new ProductsRepository()
  const productsService = new ProductsService(productsRepository)
  const productsController = new ProductsController(productsService)
  app.post('/products', (req, reply) => productsController.create(req, reply))
  app.get('/products', (req, reply) => productsController.findAll(req, reply))
  app.get('/products/:id', (req, reply) => productsController.findById(req, reply))
  app.get('/products/category/:categoryId', (req, reply) => productsController.findByCategory(req, reply))
  app.put('/products/:id', (req, reply) => productsController.update(req, reply))
  app.delete('/products/:id', (req, reply) => productsController.delete(req, reply))
}

