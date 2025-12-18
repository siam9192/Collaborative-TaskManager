export interface UserRegisterPayload {
  name: string;
  email: string;
  username: string;
  password: string;
}

export interface UserLoginPayload {
  identifier: string;
  password: string;
}
