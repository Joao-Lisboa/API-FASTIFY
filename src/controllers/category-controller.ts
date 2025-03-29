import { createCategorySchema, updateCategorySchema } from "@/dtos/category";
import { CategoryService } from "@/services/category-service";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, description } = createCategorySchema.parse(request.body)

      const category = await this.categoryService.create({ name, description })

      if (!category) {
        return reply.status(400).send({ message: 'Failed to create category' })
      }

      return reply.status(201).send(category)
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({ errors: error.format() })
      }

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async findAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const categories = await this.categoryService.findAll()

      if (!categories) {
        return reply.status(404).send({ message: 'Categories not found' })
      }

      return reply.status(200).send(categories)
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

      const category = await this.categoryService.findById(id)

      if (!category) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      return reply.status(200).send(category)
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

      const { name, description } = updateCategorySchema.parse(request.body)

      const category = await this.categoryService.update(id, { name, description })

      if (!category) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      return reply.status(200).send(category)
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

      const category = await this.categoryService.delete(id)

      if (!category) {
        return reply.status(404).send({ message: 'Category not found' })
      }

      return reply.status(200).send(category)
    } catch (error) {
      return reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
