import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/redis";

export async function middleware(req: NextRequest) {
    // rate limiting logix
    const ip =
                req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
                req.headers.get("x-real-ip") ??
                "unknown";
    const count = await redis.incr(ip)
    console.log(count)
    if(count == 1){
        await redis.expire(ip, 3600);
    }else if(count > 100){
        return new  NextResponse("Rate limit exceed!", {status: 429})
    }
    // authentication check
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
    })

    if (!token) {
        return NextResponse.redirect(new URL('/signin', req.url))
    }
    // rate limiting function -> 
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
    ],
}