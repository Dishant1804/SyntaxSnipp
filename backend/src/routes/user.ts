import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import bcrypt from 'bcrypt'
import { SigninInput, signinInput, signupInput } from '@dishantmiyani/syntaxsnipp-common'

//generic to define the type of env variables
export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" })
  }

  const hashedPassword = await bcrypt.hash(body.password, 10)
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token })
  }
  catch (e) {
    c.status(500);
    return c.json({ "error": "Internal server error" })
  }
});

userRouter.post('/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" })
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      }
    });

    if (!user) {
      c.status(403);
      return c.json({
        "error": "User not found"
      })
    }

    const match = bcrypt.compare(body.password, user.password)

    if (!match) {
      c.status(401);
      return c.json({ "message": "Invalid password" })
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });

  } catch (e) {
    c.status(500);
    return c.json({ "error": "Internal server error" })
  }
});
