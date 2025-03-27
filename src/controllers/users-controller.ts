import { FastifyRequest, FastifyReply } from 'fastify'
import { createUserSchema, updateUserSchema } from '../dtos/user'
import { UsersService, UserAlreadyExistsError } from '../services/users-service'
import { z } from 'zod'

export class UsersController {
  constructor(private usersService: UsersService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password } = createUserSchema.parse(request.body)

      const user = await this.usersService.createUser({ name, email, password })

      return reply.status(201).send(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      if (error instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: error.message })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async listUserById(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    try {
      const { id } = paramsSchema.parse(request.params)

      const user = await this.usersService.getUserById(id)

      if (!user) {
        return reply.status(404).send({ message: 'User not found' })
      }

      return reply.send(user)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async listAll(reply: FastifyReply) {
    const users = await this.usersService.getAllUsers()

    return reply.send(users)
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    try {
    const { id } = paramsSchema.parse(request.params)

    const { name, email } = updateUserSchema.parse(request.body)

    const user = await this.usersService.updateUser(id, { name, email })

    return reply.send(user)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ errors: error.format() })
    }
    
  }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    
    try {
      const { id } = paramsSchema.parse(request.params)

      await this.usersService.deleteUser(id)

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }   
} 