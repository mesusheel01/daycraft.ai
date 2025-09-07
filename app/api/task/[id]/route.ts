import { NextRequest } from "next/server"


export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const { id } = params;
  return new Response(`Hello, this is the task API endpoint for task ${id}!`)
}