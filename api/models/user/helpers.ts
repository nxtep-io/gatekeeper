import * as crypto from "crypto";

// TODO: Move this to a config file
const PASSWORD_SECRET_EXPIRES_IN_DAYS = 7;

export function genHash(password, salt): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, new Buffer(salt, "hex"), 100000, 512, "sha512", (err, key) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(key.toString("hex"));
    });
  });
}

export async function genPassword(password: string): Promise<{ salt: string; hash: string }> {
  const salt = crypto.randomBytes(128).toString("hex");
  return { salt, hash: await genHash(password, salt) };
}
