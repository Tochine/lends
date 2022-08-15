import * as bcrypt from "bcrypt";
import config from "../config";

export function bcryptHash(password: string) {
    return bcrypt.hash(password, config.app.bcrypt_rounds);
  }