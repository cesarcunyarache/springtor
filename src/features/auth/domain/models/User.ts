import { HtppStatus } from "../../../../core/common/http/HttpStatus";

export interface User {
  id: string;
  name: string;
  email: string;
  status: boolean;
}

export interface AuthResponse {
  status: HtppStatus;
  data: User;
  message: string;
}

export type Role = { id: string, name: string, permissions: Permission[] }

export type Permission = string; 

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  status: string;
  roles: {
    id: number;
    name: string;
    permissions: { id: number; name: string }[];
  }[];
};