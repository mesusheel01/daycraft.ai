import { NextRequest } from "next/server";
import { PrismaClient } from "@/lib/generated/prisma";
import { aiGenerate, revampTheResponse } from "@/utils/talktome";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const pc = new PrismaClient();

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
  try {
    console.log(await getServerSession(authOptions));
    const session = await getServerSession(authOptions);
    console.log(process.env.JWT_SECRET)
    if (!session || !session.user?.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    const userId = Number(session.user.id);

    const { prompt } = await request.json();
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "No prompt provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const aiResponse = await aiGenerate(prompt);
    const formatted = await revampTheResponse(aiResponse || "[]");
    const parsedData = JSON.parse(formatted as string);

    await pc.task.createMany({
      data: parsedData.map((task: Task) => ({
        time: task.time,
        task: task.task,
        tips: task.tips || "",
        userId: userId,
      })),
      skipDuplicates: true,
    });

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
  context: { params: Promise<{ id: string }> }
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