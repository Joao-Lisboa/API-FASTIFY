import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '../server'
import { prisma } from '../lib/prisma'

describe('Users Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
    await app.close()
  })

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          password: '123456'
        })

      expect(response.status).toBe(201)
      expect(response.body).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: 'John Doe',
          email: 'john@example.com',
          password: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        })
      )
    })

    it('should not create a user with invalid data', async () => {
      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'Jo', // nome muito curto
          email: 'invalid-email',
          password: '123456'
        })

      expect(response.status).toBe(400)
      expect(response.body.errors).toBeTruthy()
    })

    it('should not create a user with existing email', async () => {
      await request(app.server)
        .post('/users')
        .send({
          name: 'Existing User',
          email: 'existing@example.com',
          password: '123456'
        })

      const response = await request(app.server)
        .post('/users')
        .send({
          name: 'Another User',
          email: 'existing@example.com',
          password: '123456'
        })

      expect(response.status).toBe(409)
      expect(response.body.message).toBe('User already exists with this email.')
    })
  })

  describe('GET /users/:id', () => {
    it('should get a user by id', async () => {
      const createResponse = await request(app.server)
        .post('/users')
        .send({
          name: 'Get User',
          email: 'get@example.com',
          password: '123456'
        })

      const userId = createResponse.body.id

      const response = await request(app.server)
        .get(`/users/${userId}`)

      expect(response.status).toBe(200)
      expect(response.body).toEqual(
        expect.objectContaining({
          id: userId,
          name: 'Get User',
          email: 'get@example.com'
        })
      )
    })

    it('should return 404 for non-existing user', async () => {
      const response = await request(app.server)
        .get('/users/non-existing-id')

      expect(response.status).toBe(400)
    })
  })
})