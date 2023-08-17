import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { lucia, type UserSchema } from "lucia";
import { sveltekit } from "lucia/middleware";
import prismaClient from "./prisma.js";

export const auth = lucia({
  adapter: prismaAdapter(prismaClient),
  env: dev ? "DEV" : "PROD",
  middleware: sveltekit(),
  getUserAttributes: (data: UserSchema) => {
    return {
      ...data,
    };
  },
  sessionCookie: {
    expires: false,
  },
});

export type Auth = typeof auth;
