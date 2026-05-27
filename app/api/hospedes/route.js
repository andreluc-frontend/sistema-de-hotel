import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { nome, cpf, quarto, telefone, senha } = await req.json();

    // Validações básicas
    if (!nome || !cpf || !quarto || !telefone || !senha) {
      return Response.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Verificar se quarto já está ocupado
    const quartoOcupado = await pool.query(
      "SELECT id FROM hospedes WHERE quarto = $1",
      [Number(quarto)]
    );

    if (quartoOcupado.rows.length > 0) {
      return Response.json(
        { error: "Quarto já está ocupado" },
        { status: 400 }
      );
    }

    // Verificar se CPF já existe
    const cpfExistente = await pool.query(
      "SELECT id FROM hospedes WHERE cpf = $1",
      [cpf]
    );

    if (cpfExistente.rows.length > 0) {
      return Response.json(
        { error: "CPF já cadastrado" },
        { status: 400 }
      );
    }

    // Hash da senha
    const hash = await bcrypt.hash(senha, 10);

    // Inserir novo hóspede
    const result = await pool.query(
      "INSERT INTO hospedes (nome, cpf, quarto, telefone, senha) VALUES ($1,$2,$3,$4,$5) RETURNING id, nome, cpf, quarto, telefone",
      [nome, cpf, Number(quarto), telefone, hash]
    );

    console.log("✅ Hóspede cadastrado:", result.rows[0]);
    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("❌ Erro na API POST /hospedes:", error.message);
    return Response.json(
      { error: "Erro ao criar reserva: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT id, nome, cpf, quarto, telefone FROM hospedes ORDER BY quarto ASC"
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error("❌ Erro na API GET /hospedes:", error.message);
    return Response.json(
      { error: "Erro ao buscar hóspedes: " + error.message },
      { status: 500 }
    );
  }
}
