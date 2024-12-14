import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const dbConnect = globalThis.prismaGlobal ?? prismaClientSingleton();

console.log("\n\n" + prismaClientSingleton() + "\n\n");

export default dbConnect;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = dbConnect;
