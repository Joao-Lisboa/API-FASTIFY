import { beforeAll, afterAll } from 'vitest'
import { app } from '../../server'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
}) 