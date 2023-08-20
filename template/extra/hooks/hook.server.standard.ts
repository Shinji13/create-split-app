import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { auth } from "$lib/Server/lucia";

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
