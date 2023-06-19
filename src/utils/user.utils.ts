export interface UserToken {
  id: number;
  email: string;
}

export interface UserRegister {
  email: string;
  phone: string;
  name: string;
  password: string;
}

export interface UserResponse {
  token: string;
  name: string;
  email: string;
  isAdmin?: boolean | null;
}
