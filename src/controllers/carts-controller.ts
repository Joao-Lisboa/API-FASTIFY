import { FastifyRequest, FastifyReply } from 'fastify'
import { addToCartSchema, updateCartItemSchema } from '../dtos/cart'
import { CartsService, ProductNotFoundError, CartItemNotFoundError, InsufficientStockError } from '../services/carts-service'
import { z } from 'zod'
 
export class CartsController {
  constructor(private cartsService: CartsService) {}

  async addToCart(
    request: FastifyRequest<{
      Body: z.infer<typeof addToCartSchema>
    }>,
    reply: FastifyReply
  ) {
    try {
      const { sub: userId } = (request as any).user
      const data = addToCartSchema.parse(request.body)

      const item = await this.cartsService.addToCart(userId, data)

      return reply.status(201).send(item)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      if (error instanceof ProductNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      if (error instanceof InsufficientStockError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async updateCartItem(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      itemId: z.string().uuid()
    })

    try {
      const { itemId } = paramsSchema.parse(request.params)
      const data = updateCartItemSchema.parse(request.body)

      const item = await this.cartsService.updateCartItem(itemId, data)

      return reply.send(item)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      if (error instanceof CartItemNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      if (error instanceof InsufficientStockError) {
        return reply.status(400).send({ message: error.message })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async removeCartItem(request: FastifyRequest, reply: FastifyReply) {
    const paramsSchema = z.object({
      itemId: z.string().uuid()
    })

    try {
      const { itemId } = paramsSchema.parse(request.params)

      await this.cartsService.removeCartItem(itemId)

      return reply.status(204).send()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      if (error instanceof CartItemNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async clearCart(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sub: userId } = (request as any).user

      await this.cartsService.clearCart(userId)

      return reply.status(204).send()
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async getCart(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { sub: userId } = (request as any).user

      const cart = await this.cartsService.getCart(userId)

      return reply.send(cart)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }
} 