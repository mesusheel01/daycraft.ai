import { NextRequest } from "next/server"
import { PrismaClient } from "@/lib/generated/prisma";
import { checkAuth } from "@/utils/authorize";

const pc = new PrismaClient();


// export const GET = async (request: NextRequest) => {
//   return new Response('Hello, this is the task API endpoint!')
// }

export const GET = async (request: NextRequest) => {
  if(!checkAuth(request))
    return new Response('Unauthorized', { status: 401 });
  const userId = request.headers.get('x-user-id');
  const tasks = await pc.task.findMany();

  return new Response(JSON.stringify(tasks) + ` for user ${userId}`, { status: 200 });
}


// export const POST = async (request: NextRequest) => {
//   if(!checkAuth(request))
//     return new Response('Unauthorized', { status: 401 });

//   const {  } = await request.json();

//   const newTask = await pc.task.create({
//     data: {
      
//     }
//   });

//   return new Response(JSON.stringify(newTask), { status: 201 });
// }
