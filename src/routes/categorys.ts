import { FastifyInstance } from "fastify";
import { CategoryController } from "../controllers/category-controller";
import { CategoryService } from "../services/category-service";
import { CategoryRepository } from "../repositories/category-repository";
import { authMiddleware } from '../middlewares/auth'

export async function categoryRoutes(app: FastifyInstance) {
    const categoryRepository = new CategoryRepository()
    const categoryService = new CategoryService(categoryRepository)
    const categoryController = new CategoryController(categoryService)

    app.post('/categories', { preHandler: authMiddleware }, (req, reply) => categoryController.create(req, reply))
    app.get('/categories', { preHandler: authMiddleware }, (req, reply) => categoryController.findAll(req, reply))
    app.get('/categories/:id', { preHandler: authMiddleware }, (req, reply) => categoryController.findById(req, reply))
    app.put('/categories/:id', { preHandler: authMiddleware }, (req, reply) => categoryController.update(req, reply))
    app.delete('/categories/:id', { preHandler: authMiddleware }, (req, reply) => categoryController.delete(req, reply))
}

