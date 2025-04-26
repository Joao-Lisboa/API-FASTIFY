import { FastifyRequest, FastifyReply } from 'fastify'

export interface IUsersController {
  create(request: FastifyRequest, reply: FastifyReply): Promise<void>
  listUserById(request: FastifyRequest, reply: FastifyReply): Promise<void>
  listAll(reply: FastifyReply): Promise<void>
  updateUser(request: FastifyRequest, reply: FastifyReply): Promise<void>
  deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<void>
  login(request: FastifyRequest, reply: FastifyReply): Promise<void>
} 