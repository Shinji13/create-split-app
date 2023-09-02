export type tocLink = {
	name: string;
	degree: number;
	order: number;
};

export const lightPrimary = new Map([
	['--primary800', '#3366FF'],
	['--primary400', '#3366FF66'],
	['--primary100', ' #3366FF1A']
]);

export const darkPrimary = new Map([
	['--primary800', '#9f7cdc'],
	['--primary400', '#9f7cdc86'],
	['--primary100', ' #9f7cdc23']
]);

export const darkFont = '#140f0e';

export const whiteFont = '#f0e8e8';

export const whiteBg = '#dfe2ec';

export const darkBg = '#152038';

export let respresentationCode: {
	fileName: string;
	code: string;
	language: 'typescript' | 'css';
}[] = [
	{
		fileName: 'hooks.server.ts',
		language: 'typescript',
		code: `import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { auth } from "$lib/Server/config/lucia";

const LuciaHook: Handle = async ({ resolve, event }) => {
   const authRequest = auth.handleRequest(event);
   try {
      auth.validateRequestOrigin({
        url: event.url.href,
        method: event.request.method,
        headers: {
	       origin: event.url.origin,
        },
     });
   } catch (error) {
        return new Response("Access denied", {
             status: 403,
        });
    }
    const session = await authRequest.validate();
    event.locals.auth = authRequest;
    event.locals.user = session ? session.user : null;
    return resolve(event);
};
export const handle = sequence(LuciaHook);
`
	},
	{
		fileName: 'lucia.ts',
		language: 'typescript',
		code: `import { prisma as prismaAdapter } from "@lucia-auth/adapter-prisma";
import { dev } from "$app/environment";
import { lucia, type UserSchema } from "lucia";
import { sveltekit } from "lucia/middleware";
import prismaClient from "./prisma";

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
`
	},
	{
		fileName: 'app.css',
		language: 'css',
		code: `a {
    color: inherit;
    text-decoration: none;
}

* {
   padding: 0;
   margin: 0;
   list-style: none;
   box-sizing: border-box;
}

:root {
   --huge: clamp(3.8rem, calc(3.8rem + ((1vw - 0.48rem) * 1.3889)), 4.8rem);
   --h1: clamp(2.8rem, calc(2.8rem + ((1vw - 0.48rem) * 1.3889)), 3.8rem);
   --h2: clamp(2rem, calc(2rem + ((1vw - 0.48rem) * 1.3889)), 3rem);
   --h3: clamp(1.5rem, calc(1.5rem + ((1vw - 0.48rem) * 0.5208)), 1.875rem);
   --h4: clamp(1.125rem, calc(1.125rem + ((1vw - 0.48rem) * 0.3472)), 1.375rem);
   --body: clamp(1rem, calc(1rem + ((1vw - 0.48rem) * 0.1736)), 1.125rem);
   --small: clamp(0.875rem, calc(0.875rem + ((1vw - 0.48rem) * 0.1736)), 1rem);
/* this is the corresponding line heights for each header */
   --lh1: 1.3;
   --lh2: 1.35;
   --lh3: 1.4;
   --lh4: 1.5;
   --lhbody: 1.6;

   --blue: #0074d9;
   --red: #ff4136;
   --orange: #ff851b;
   --yellow: #ffdc00;
   --green: #2ecc40;
   --black: #111111;
   --gray: #aaaaaa;
   --silver: #dddddd;
   --white: #ffffff;
}
`
	}
];
