import { beforeAll, afterAll } from 'vitest'
import { app } from '../../app'

beforeAll(async () => {
  await app.ready()
})

afterAll(async () => {
  await app.close()
}) 