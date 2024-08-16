import * as bcrypt from "bcryptjs";

export const encrypt = async (
  password: string,
  salt: number
): Promise<string> => {
  return await bcrypt.hash(password, salt);
};

export const compare = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};
