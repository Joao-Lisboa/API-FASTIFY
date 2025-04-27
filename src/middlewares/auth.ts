import { FastifyRequest, FastifyReply } from 'fastify'

interface JwtPayload {
  sub: string
  name: string
  email: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user: JwtPayload
  }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  try {
    const decoded = await request.jwtVerify<JwtPayload>()
    request.user = decoded
  } catch (error) {
    return reply.status(401).send({ message: 'Não autorizado' })
  }
} 