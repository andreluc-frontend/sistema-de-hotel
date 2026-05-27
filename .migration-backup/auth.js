import jwt from "jsonwebtoken";

const SECRET = "hotel_secreto123";

export function gerarToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: "1d" });
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
