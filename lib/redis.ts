import { Redis } from "@upstash/redis";

const globalForRedis = globalThis as unknown as {
  redis?: Redis;
};

export const redis =
  globalForRedis.redis ??
  new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

// THIS LINE IS THE FIX — without it, every hot-reload / module re-import
// creates a fresh connection instead of reusing the cached one
if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}
