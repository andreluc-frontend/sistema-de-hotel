import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { nome, cpf, quarto, telefone, senha } = await req.json();

    const quartoOcupado = await pool.query(
      "SELECT id FROM hospedes WHERE quarto = $1",
      [quarto]
    );
    if (quartoOcupado.rows.length > 0) {
      return Response.json({ error: "Quarto já está ocupado" }, { status: 400 });
    }

    const hash = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      "INSERT INTO hospedes (nome, cpf, quarto, telefone, senha) VALUES ($1,$2,$3,$4,$5) RETURNING id, nome, cpf, quarto, telefone",
      [nome, cpf, quarto, telefone, hash]
    );

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("ERRO NA API:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, nome, cpf, quarto, telefone FROM hospedes ORDER BY quarto ASC"
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error("ERRO NA API:", error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
}