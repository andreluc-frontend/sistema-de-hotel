import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "hotel_secreto123";

if (!process.env.JWT_SECRET) {
  console.warn("⚠️ JWT_SECRET não está configurado em .env.local. Usando valor padrão (inseguro em produção)");
}

export function gerarToken(user) {
  try {
    return jwt.sign(user, SECRET, { expiresIn: "1d" });
  } catch (error) {
    console.error("❌ Erro ao gerar token:", error.message);
    return null;
  }
}

export function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("❌ Erro ao verificar token:", error.message);
    return null;
  }
}
