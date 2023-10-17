import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { auth } from "$lib/server/config/lucia";

const LuciaHook: Handle = async ({ resolve, event }) => {
  const authRequest = auth.handleRequest(event);
  const session = await authRequest.validate();
  event.locals.auth = authRequest;
  event.locals.user = session ? session.user : null;
  return resolve(event);
};
export const handle = sequence(LuciaHook);
