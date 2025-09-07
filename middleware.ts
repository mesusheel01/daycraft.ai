// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken"; // or jose, etc.
import { decode } from "punycode";


export interface JwtPayload {
  "userId": string;
  "iat": number;
  "exp": number;
}
export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

    const token = authHeader.split(" ")[1];

  try {
    console.log("inside trycatch")
    const decoded= jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    // Clone request and inject userId
    console.log(decoded.userId);
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", decoded.userId);
    console.log("before return next ")
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}

// Protect only API routes
export const config = {
  matcher: "/api/:path*",
};