import { FastifyInstance } from 'fastify'
import { UsersController } from '../controllers/users-controller'
import { UsersService } from '../services/users-service'
import { UsersRepository } from '../repositories/users-repository'

export async function usersRoutes(app: FastifyInstance) {
  const usersRepository = new UsersRepository()
  const usersService = new UsersService(usersRepository)
  const usersController = new UsersController(usersService)

  app.post('/users', (req, reply) => usersController.create(req, reply))
  app.get('/users/:id', (req, reply) => usersController.listUserById(req, reply))
  app.get('/users', (req, reply) => usersController.listAll(reply))
  app.put('/users/:id', (req, reply) => usersController.updateUser(req, reply))
  app.delete('/users/:id', (req, reply) => usersController.deleteUser(req, reply))
} 