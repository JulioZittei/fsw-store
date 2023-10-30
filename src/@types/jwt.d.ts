import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface DefaultJWT {
    id?: string | null;
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
  }
}
