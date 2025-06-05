import Redis from "ioredis";

let client: Redis | null = null;

export async function getRedisClient() {
  if (client) return client;

  client = new Redis({
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT ?? "6379"),
    username: process.env.REDIS_USERNAME ?? "default",
    password: process.env.REDIS_PASSWORD,
  });

  return client;
}
