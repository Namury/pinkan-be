import { UUID } from "crypto";

export interface UserToken {
  id: string;
  shNumber: string|null;
}

export interface UserRegister {
  name: string;
  shNumber: string;
  email?:string;
  salesZoneId: UUID;
  password: string;
}

export interface UserResponse {
  token: string;
  name: string;
  shNumber: string;
  isAdmin?: boolean | null;
}
