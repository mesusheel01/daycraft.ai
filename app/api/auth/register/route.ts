
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma";

const pc = prisma;

export const POST = async (req: Request) => {
  try {
    const { username, email, password } = await req.json()

    // Here, you would typically add code to save the user to your database.
    // For demonstration purposes, we'll just return the received data.

    if (!username || !email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 })
    }

    // Simulate user creation
    const existingUser = await pc.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pc.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      }
    });

    return new Response(JSON.stringify({ message: "User registered successfully", user: newUser }), { status: 201 })
  } catch (error) {
    console.log("signup error", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}   