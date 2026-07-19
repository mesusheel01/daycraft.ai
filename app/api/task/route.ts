import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { aiGenerate, revampTheResponse } from "@/utils/talktome";
import prisma from "@/lib/prisma";
import { redis } from '@/lib/redis';


const pc = prisma;


interface Task {
  time: string;
  task: string;
  tips?: string;
  completed?: boolean;
}

export const GET = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(session.user.id);
  const tasks = await pc.task.findMany({ where: { userId } });

  return new Response(JSON.stringify(tasks), { status: 200 });
};

export const POST = async (request: NextRequest) => {
  console.log("REDIS URL : ", process.env.REDIS_URL)
  try {
    console.log(await getServerSession(authOptions));
    const session = await getServerSession(authOptions);
    console.log(process.env.JWT_SECRET)
    if (!session || !session.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(session.user.id);

    const { prompt, isNight } = await request.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    
    // Check if there's an existing schedule in the cache
    const cachedTasks = await redis.get(`schedule:${userId}`);
    let finalPrompt = "";
    console.log("Cached tasks:", cachedTasks);
    if (cachedTasks) {
        finalPrompt = `
        You are updating an existing daily schedule.

        Current Schedule:
        ${cachedTasks}

        User Request:
        ${prompt}

        Instructions:
        - Modify ONLY the tasks related to the user's request.
        - Keep all unrelated tasks unchanged.
        - Preserve the existing structure and timing whenever possible.
        - Return the complete updated schedule in the exact JSON format.
        `;
    } else {
        finalPrompt = prompt;
    }
    const aiResponse = await aiGenerate(finalPrompt, isNight);
    const formatted = await revampTheResponse(aiResponse || "[]");
    const parsedData = JSON.parse(formatted as string);
    // Save the updated schedule to the database and cache and delete the old one
    await pc.$transaction([
        pc.task.deleteMany({
            where: {
                userId
            }
        }),
        pc.task.createMany({
          data: parsedData.map((task: Task) => ({
            time: task.time,
            task: task.task,
            tips: task.tips || "",
            userId: userId,
          })),
          skipDuplicates: true,
        })
    ]);
    await redis.set(`schedule:${userId}`, JSON.stringify(parsedData), {ex: 60 * 60 * 12}); // Cache for 12 hours
    console.log("Updated schedule saved to database and cache for user:", userId);
    return new Response(
      JSON.stringify({ saved: true, count: parsedData.length }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("POST /api/ai error:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};


//delete all the task
export const DELETE = async (
  request: NextRequest,
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(session.user.id);

  try {
    const deletedTask = await pc.task.deleteMany({
      where: { userId },
    });
    return new Response(JSON.stringify(deletedTask), { status: 200 });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
