import { Router } from "express";
import bcrypt from "bcrypt";
import { db, hospedesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await db
      .select({ id: hospedesTable.id, nome: hospedesTable.nome, cpf: hospedesTable.cpf, quarto: hospedesTable.quarto, telefone: hospedesTable.telefone })
      .from(hospedesTable)
      .orderBy(hospedesTable.quarto);
    return res.json(result);
  } catch (err) {
    req.log.error({ err }, "Error in GET /hospedes");
    return res.status(500).json({ error: "Erro ao buscar hóspedes" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { nome, cpf, quarto, telefone, senha } = req.body;

    if (!nome || !cpf || !quarto || !telefone || !senha) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    const existingQuarto = await db.select({ id: hospedesTable.id }).from(hospedesTable).where(eq(hospedesTable.quarto, Number(quarto))).limit(1);
    if (existingQuarto.length > 0) {
      return res.status(400).json({ error: "Quarto já está ocupado" });
    }

    const existingCpf = await db.select({ id: hospedesTable.id }).from(hospedesTable).where(eq(hospedesTable.cpf, cpf)).limit(1);
    if (existingCpf.length > 0) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    const hash = await bcrypt.hash(senha, 10);

    const result = await db.insert(hospedesTable).values({
      nome, cpf, quarto: Number(quarto), telefone, senha: hash,
    }).returning({ id: hospedesTable.id, nome: hospedesTable.nome, cpf: hospedesTable.cpf, quarto: hospedesTable.quarto, telefone: hospedesTable.telefone });

    return res.status(201).json(result[0]);
  } catch (err) {
    req.log.error({ err }, "Error in POST /hospedes");
    return res.status(500).json({ error: "Erro ao criar reserva" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID não fornecido" });

    const result = await db
      .select({ id: hospedesTable.id, nome: hospedesTable.nome, cpf: hospedesTable.cpf, quarto: hospedesTable.quarto, telefone: hospedesTable.telefone })
      .from(hospedesTable)
      .where(eq(hospedesTable.id, id))
      .limit(1);

    if (result.length === 0) return res.status(404).json({ error: "Hóspede não encontrado" });
    return res.json(result[0]);
  } catch (err) {
    req.log.error({ err }, "Error in GET /hospedes/:id");
    return res.status(500).json({ error: "Erro ao buscar hóspede" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: "ID não fornecido" });

    const result = await db.delete(hospedesTable).where(eq(hospedesTable.id, id)).returning({ id: hospedesTable.id });

    if (result.length === 0) return res.status(404).json({ error: "Hóspede não encontrado" });
    return res.json({ ok: true, deleted: result[0] });
  } catch (err) {
    req.log.error({ err }, "Error in DELETE /hospedes/:id");
    return res.status(500).json({ error: "Erro ao deletar hóspede" });
  }
});

export default router;
