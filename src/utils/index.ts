import * as bcrypt from "bcrypt";
import crypto from "crypto";
import config from "../config";

export function bcryptHash(password: string) {
    return bcrypt.hash(password, config.app.bcrypt_rounds);
}

export function bcryptCompare(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateToken(length: number) {
  const token = crypto.randomBytes(length).toString("hex");
  return token;
}

export function generateRandomCode(length: number) {
  return crypto
    .randomBytes(length * 3)
    .toString('base64')
    .split('+')
    .join('')
    .split('/')
    .join('')
    .split('=')
    .join('')
    .substring(0, length);
}