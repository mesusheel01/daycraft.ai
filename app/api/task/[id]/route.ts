import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) => {
  const { id } = await context.params; // 👈 await here (this is the fix)
  return new Response(`Hello, this is the task API endpoint for task ${id}!`, {
    status: 200,
  });
};


