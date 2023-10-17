import type { AuthRequest, UserSchema } from "lucia";

declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface Platform {}
    interface Locals {
      user: UserSchema;
      auth: AuthRequest;
    }
  }
  // <reference types="lucia" />
  namespace Lucia {
    type Auth = import("./lib/server/config/lucia").Auth;
    // eslint-disable-next-line @typescript-eslint/ban-types
    type DatabaseUserAttributes = {
      // any user property you want lucia to expose mention it here
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    type DatabaseSessionAttributes = {};
  }
}
