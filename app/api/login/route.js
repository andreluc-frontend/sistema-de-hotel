import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { gerarToken } from "@/lib/auth";

export async function POST(req) {
  const { cpf, senha } = await req.json();
  const result = await pool.query("SELECT * FROM hospedes WHERE cpf = $1", [cpf]);
  const hospede = result.rows[0];
  if (!hospede) return Response.json({ error: "Hóspede não encontrado" }, { status: 404 });
  const ok = await bcrypt.compare(senha, hospede.senha);
  if (!ok) return Response.json({ error: "Senha inválida" }, { status: 401 });
  const token = gerarToken({ id: hospede.id, nome: hospede.nome, quarto: hospede.quarto });
  return Response.json({ token, nome: hospede.nome, quarto: hospede.quarto });
}
