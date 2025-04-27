import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { env } from './config/env'
import { usersRoutes } from './routes/users'
import { productsRoutes } from './routes/products'
import { categoryRoutes } from './routes/categorys'
import { jwtConfig } from './config/jwt'
import { cartRoutes } from './routes/cart'
export const app = fastify({
  logger: true
})

// Registra o plugin CORS
app.register(cors, {
  origin: true // Permite todas as origens em desenvolvimento
})

// Registra o plugin JWT
app.register(jwt, jwtConfig)

// Registra as rotas
app.register(usersRoutes)
app.register(productsRoutes)
app.register(categoryRoutes)
app.register(cartRoutes)

// Rota de teste
app.get('/', async () => {
  return { message: 'API está funcionando!' }
})

// Inicia o servidor
const start = async (): Promise<void> => {
  try {
    await app.listen({ 
      port: env.PORT,
      host: '0.0.0.0' 
    })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

if (process.env.NODE_ENV !== 'test') {
  start()
} 