import { dev } from "$app/environment";
import { lucia, type UserSchema } from "lucia";
import { sveltekit } from "lucia/middleware";

// define your database adapter check lucia https://lucia-auth.com/database-adapters

export const auth = lucia({
  adapter: yourDbAdapter,
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
