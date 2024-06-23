import { Hono } from 'hono';
import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createPost, updatePost } from '@dishantmiyani/syntaxsnipp-common';

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
  Variables: {
    userId: string,
  }
}>();

postRouter.use(async (c, next) => {
  const jwt = c.req.header('Authorization');
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  //@ts-ignore
  c.set('userId', payload.id);
  await next();
});

postRouter.post('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createPost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" });
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        description: body.description,
        authorId: userId,
      }
    });

    return c.json({ id: post.id });
  } catch (e) {
    c.status(500);
    return c.json({ "error": "Internal server error" });
  }
});

postRouter.patch('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const parsed = updatePost.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ error: "Invalid input data" });
  }

  const { title, content, bookmark, description, like, id } = parsed.data;

  const updateData: { [key: string]: any } = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (bookmark !== undefined) updateData.bookmark = bookmark;
  if (description !== undefined) updateData.description = description;
  if (like !== undefined) updateData.like = like;

  try {
    const post = await prisma.post.update({
      where: {
        id: id,
      },
      data: updateData,
    });

    return c.json({ post });
  } catch (e: any) {
    console.error("Error updating post:", e);
  }
});


postRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const page = Number(c.req.query('page')) || 1;
  const pageSize = 10;

  const posts = await prisma.post.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    select: {
      title: true,
      content: true,
      description: true,
      bookmark: true,
      like: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ posts });
});

postRouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      select: {
        title: true,
        content: true,
        description: true,
        bookmark: true,
        like: true,
        id: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return c.json({ post });
  } catch (e) {
    c.status(404);
    return c.json({ e });
  }
});
