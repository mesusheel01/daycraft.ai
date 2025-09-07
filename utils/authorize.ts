import { NextRequest } from "next/server";


export const checkAuth = (request: NextRequest) => {
  // Authorization logic here
  const token = request.headers.get('Authorization');

  return token === `Bearer ${process.env.AUTH_TOKEN}`;
}

