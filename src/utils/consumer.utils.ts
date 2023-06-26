import { UUID } from "crypto";

export interface consumerCreate {
  name: string;
  shNumber: string;
  email?:string;
  salesZoneId: UUID;
  password: string;
}

export interface consumerEdit {
  name: string;
  shNumber: string;
  email?:string;
  salesZoneId: UUID;
  password: string;
}

export interface consumerResponse {
  token: string;
  name: string;
  shNumber: string;
  isAdmin?: boolean | null;
}
