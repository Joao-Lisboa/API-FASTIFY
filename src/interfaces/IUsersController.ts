import { FastifyRequest, FastifyReply } from 'fastify'

export interface IUsersController {
  create(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
  listUserById(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
  listAll(reply: FastifyReply): Promise<FastifyReply>
  updateUser(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
  deleteUser(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply>
} 