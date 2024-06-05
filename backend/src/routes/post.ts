import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createPost, updatePost } from '@dishantmiyani/syntaxsnipp-common'

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
  Variables: {
    userId: string,
  }
}>()

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
  const userId = c.get('userId')
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createPost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" })
  }
  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      }
    })

    return c.json({ id: post.id });
  } catch (e) {
    c.status(500)
    return c.json({ "error": "Internal server error" })
  }

});

postRouter.put('/', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updatePost.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" })
  }

  try {
    await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
        bookmark: body.bookmark,
      }
    })

    return c.json({ "message": "Updated successfully", "id": body.id });
  } catch (e) {
    c.status(500);
    return c.json({ "error": "Internal server error" });
  }
});

//add pagination (load 10 post at max and then load the post as the user scrolls)
postRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const posts = await prisma.post.findMany({
    select : {
      title : true,
      content : true,
      bookmark : true,
      id : true,
      author : {
        select : {
          name : true,
        }
      }
    }
  });

  return c.json({ posts });
})

postRouter.get('/:id', async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
        id,
      }
    })
    return c.json({ post });
  } catch (e) {
    c.status(404);
    return c.json({ e });
  }
})


