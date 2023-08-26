import { PrismaClient } from "@prisma/client";

const globalPrisma = globalThis as unknown as { prisma: PrismaClient };

const prismaClient = globalPrisma.prisma || new PrismaClient();

export default prismaClient;
