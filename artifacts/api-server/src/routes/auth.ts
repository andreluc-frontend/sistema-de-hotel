import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db, hospedesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || "hotel_secreto123";

router.post("/login", async (req, res) => {
  try {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
      return res.status(400).json({ error: "CPF e senha são obrigatórios" });
    }

    const result = await db.select().from(hospedesTable).where(eq(hospedesTable.cpf, cpf)).limit(1);
    const hospede = result[0];

    if (!hospede) {
      return res.status(404).json({ error: "Hóspede não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, hospede.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ error: "Senha inválida" });
    }

    const token = jwt.sign(
      { id: hospede.id, nome: hospede.nome, cpf: hospede.cpf, quarto: hospede.quarto },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({ token, id: hospede.id, nome: hospede.nome, cpf: hospede.cpf, quarto: hospede.quarto });
  } catch (err) {
    req.log.error({ err }, "Error in POST /auth/login");
    return res.status(500).json({ error: "Erro ao fazer login" });
  }
});

export default router;
