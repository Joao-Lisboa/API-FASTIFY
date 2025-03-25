import fastify from 'fastify'
import cors from '@fastify/cors'
import { env } from './config/env'
import { usersRoutes } from './routes/users'

export const app = fastify({
  logger: true
})

// Registra o plugin CORS
app.register(cors, {
  origin: true // Permite todas as origens em desenvolvimento
})

// Registra as rotas
app.register(usersRoutes)

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