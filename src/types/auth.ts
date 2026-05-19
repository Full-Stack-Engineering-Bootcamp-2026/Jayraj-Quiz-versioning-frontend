export type JwtPayload = {
  userUuid: string;
  permissions: string[];
  exp: number;
};

export type AuthState = {
  token: string | null;
  permissions: string[];
  isAuthenticated: boolean;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};