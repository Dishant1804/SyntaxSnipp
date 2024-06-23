import z from 'zod'

export const createPost = z.object({
    title : z.string(),
    description : z.string(),
    content : z.string()
})

export const updatePost = z.object({
  title : z.string().optional(),
  content : z.string().optional(),
  id : z.string(),
  bookmark : z.boolean().optional(),
  description : z.string().optional(),
  like : z.boolean().optional(),
})

export type CreatePost = z.infer<typeof createPost>
export type UpdatePost = z.infer<typeof updatePost>