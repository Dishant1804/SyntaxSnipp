import z from 'zod'

export const createPost = z.object({
    title : z.string().max(150),
    content : z.string()
})

export const updatePost = z.object({
    title : z.string().max(150),
    content : z.string(),
    id : z.string(),
    bookmark : z.boolean().optional()
})

export type CreatePost = z.infer<typeof createPost>
export type UpdatePost = z.infer<typeof updatePost>