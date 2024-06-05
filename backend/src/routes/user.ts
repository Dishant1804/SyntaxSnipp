import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from '@dishantmiyani/syntaxsnipp-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

userRouter.post('/signup', async (c) => {

  const body = await c.req.json();
  const encoder = new TextEncoder();
  const data = encoder.encode(body.password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hash));
  const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({ "error": "incorrect inputs" })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt: token, hashedPassword })
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

    const encoder = new TextEncoder();
    const data = encoder.encode(body.password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash));
    const hashedPassword = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    if(user.password !== hashedPassword){
      c.status(403)
      return c.json({"error" : "Invalid credentials" , hashedPassword})
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });

  } catch (e) {
    c.status(500);
    return c.json({ "error": "Internal server error" })
  }
});
