export interface UserToken {
  id: string;
  shNumber: string;
}

export interface UserRegister {
  name: string;
  shNumber: string;
  email?:string;
  salesZoneId: string;
  password: string;
}

export interface UserResponse {
  token: string;
  name: string;
  shNumber: string;
  isAdmin?: boolean | null;
}
