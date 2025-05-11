import { DefaultSession } from "next-auth";
import "next-auth/jwt";



interface Permission {
  id: number | string;
  name: string;
}

// Define el tipo para un rol con sus permisos (ahora con id como número o string)
interface Role {
  id: number | string;
  name: string;
  permissions: Permission[];
}

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      roles?: Role[];
    } & DefaultSession["user"];
  }

  interface User {
    id?: string;
    roles?: Role[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    sessionId?: string;
    roles?: Role[]; 
    expires?: string;

  }
}