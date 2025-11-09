import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { PrismaClient } from "@/lib/generated/prisma";

const pc = new PrismaClient();

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params;
  return new Response(`This is the task endpoint for task ${id}`, { status: 200 });
};


export const PUT = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId = Number(session.user.id);
  const { id } = await context.params;
  const taskId = Number(id);
  type updateBody = boolean | string;

  try {
    const body = await request.json();

    // Handle different update types dynamically
    const dataToUpdate: Record<string, updateBody> = {};

    if (body.hasOwnProperty("completed")) {
      dataToUpdate.completed = body.completed;
    }

    if (body.hasOwnProperty("task")) {
      dataToUpdate.task = body.task;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return new Response("No valid fields to update", { status: 400 });
    }

    const updatedTask = await pc.task.updateMany({
      where: { id: taskId, userId },
      data: dataToUpdate,
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
