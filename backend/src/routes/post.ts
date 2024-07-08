import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
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

postRouter.patch('/edit', async (c) => {
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

  const { title, content, description, id } = parsed.data;

  const updateData: { [key: string]: any } = {};
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (description !== undefined) updateData.description = description;

  try {
    const post = await prisma.post.updateMany({
      where: {
        id: id,
        authorId: userId,
      },
      data: updateData,
    });

    return c.json({ post });
  } catch (e: any) {
    console.error("Error updating post:", e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

postRouter.patch('/bookmark', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { id, bookmark } = body;

  if (typeof id !== 'string' || typeof bookmark !== 'boolean') {
    c.status(400);
    return c.json({ error: "Invalid input data" });
  }

  try {
    const existingBookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: id,
        },
      },
    });

    if (bookmark) {
      if (!existingBookmark) {
        await prisma.bookmark.create({
          data: {
            userId: userId,
            postId: id,
          },
        });
      }
    } else {
      if (existingBookmark) {
        await prisma.bookmark.deleteMany({
          where: {
            userId: userId,
            postId: id,
          },
        });
      }
    }

    return c.json({ bookmark });
  } catch (e: any) {
    console.error("Error updating bookmark:", e);
    c.status(500);
    return c.json({ error: "Internal server error" });
  }
});

// Fetch Bookmarks Endpoint
postRouter.get('/bookmarks', async (c) => {
  const userId = c.get('userId');
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });

    const formattedBookmarks = bookmarks.map((bookmark) => ({
      id: bookmark.postId,
      bookmark: true,
    }));

    return c.json(formattedBookmarks);
  } catch (e: any) {
    console.error("Error fetching bookmarks:", e);
    c.status(500);
    return c.json({ error: "Internal server error" });
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
