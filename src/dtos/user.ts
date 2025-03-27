import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

export type CreateUserDTO = z.infer<typeof createUserSchema>

export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
}

export const updateUserSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido')
})

export type UpdateUserDTO = z.infer<typeof updateUserSchema>



  