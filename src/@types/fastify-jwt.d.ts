import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: {
      sub: string
      name: string
      email: string
      iat?: number
      exp?: number
    }
    user: {
      sub: string
      name: string
      email: string
    }
  }
} 