import { UUID } from "crypto";

export interface UserToken {
  id: string;
  salesZoneId: string|null;
  shNumber: string|null;
  isAdmin: number;
}

export interface UserRegister {
  name: string;
  shNumber: string;
  email?:string;
  salesZoneId: UUID;
  password: string;
}

export interface UserEdit {
  name?: string;
  shNumber?: string;
  email?:string;
  password?: string;
}

export interface UserResponse {
  token: string;
  name: string;
  shNumber: string;
  salesZoneId: string|null,
  provinceCode: string|null,
  isAdmin?: number;
}
