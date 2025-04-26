import { FastifyInstance } from 'fastify'
import { UsersController } from '../controllers/users-controller'
import { UsersService } from '../services/users-service'
import { UsersRepository } from '../repositories/users-repository'
import { authMiddleware } from '../middlewares/auth'

export async function usersRoutes(app: FastifyInstance) {
  const usersRepository = new UsersRepository()
  const usersService = new UsersService(usersRepository)
  const usersController = new UsersController(usersService)

  // Rotas públicas
  app.post('/users', (req, reply) => usersController.create(req, reply))
  app.post('/auth/login', (req, reply) => usersController.login(req, reply))

  // Rotas protegidas
  app.get('/users/:id', { preHandler: authMiddleware }, (req, reply) => usersController.listUserById(req, reply))
  app.get('/users', { preHandler: authMiddleware }, (req, reply) => usersController.listAll(reply))
  app.put('/users/:id', { preHandler: authMiddleware }, (req, reply) => usersController.updateUser(req, reply))
  app.delete('/users/:id', { preHandler: authMiddleware }, (req, reply) => usersController.deleteUser(req, reply))
} 