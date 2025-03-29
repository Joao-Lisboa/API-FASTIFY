import { FastifyReply } from "fastify";
import { createProductSchema, updateProductSchema } from "@/dtos/products";
import { ProductsService } from "@/services/products-service";
import { FastifyRequest } from "fastify";
import { z } from "zod";

export class ProductsController {
  constructor(private productsService: ProductsService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
    const { name, description, price, categoryId, stock } = createProductSchema.parse(request.body)

    const product = await this.productsService.create({ name, description, price, categoryId, stock })

    if (!product) {
      return reply.status(400).send({ message: 'Failed to create product' })
    }

    return reply.status(201).send(product)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await this.productsService.findAll()

      if (!products) {
        return reply.status(404).send({ message: 'Products not found' })
      }

      return reply.status(200).send(products)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async findById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

    const { id } = paramsSchema.parse(request.params)

    const product = await this.productsService.findById(id)

      if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      return reply.status(200).send(product)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async findByCategory(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        categoryId: z.string().uuid()
      })

    const { categoryId } = paramsSchema.parse(request.params)

    const products = await this.productsService.findByCategory(categoryId)

      if (!products) {
        return reply.status(404).send({ message: 'Products not found' })
      }

      return reply.status(200).send(products)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

    const { id } = paramsSchema.parse(request.params)

    const { name, description, price, categoryId, stock } = updateProductSchema.parse(request.body)

    const product = await this.productsService.update(id, { name, description, price, categoryId, stock })

      if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      return reply.status(200).send(product)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid()
      })

    const { id } = paramsSchema.parse(request.params)

    const product = await this.productsService.delete(id)

      if (!product) {
        return reply.status(404).send({ message: 'Product not found' })
      }

      return reply.status(200).send(product)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
