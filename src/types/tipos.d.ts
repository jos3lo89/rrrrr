export interface Payload {
  id: string;
  name: string;
  email: string;
}

export interface Decoded extends Payload {
  iat: number;
  exp: number;
}

export interface LoginData {
  email: string;
  password: string;
}

declare module "express" {
  interface Request {
    user?: Decoded;
  }
}
