import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { gerarToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { cpf, senha } = await req.json();

    // Validações básicas
    if (!cpf || !senha) {
      return Response.json(
        { error: "CPF e senha são obrigatórios" },
        { status: 400 }
      );
    }

    // Buscar hóspede
    const result = await pool.query(
      "SELECT * FROM hospedes WHERE cpf = $1",
      [cpf]
    );

    const hospede = result.rows[0];

    if (!hospede) {
      return Response.json(
        { error: "Hóspede não encontrado" },
        { status: 404 }
      );
    }

    // Comparar senhas
    const senhaCorreta = await bcrypt.compare(senha, hospede.senha);

    if (!senhaCorreta) {
      return Response.json(
        { error: "Senha inválida" },
        { status: 401 }
      );
    }

    // Gerar token
    const token = gerarToken({
      id: hospede.id,
      nome: hospede.nome,
      quarto: hospede.quarto,
    });

    if (!token) {
      return Response.json(
        { error: "Erro ao gerar token de autenticação" },
        { status: 500 }
      );
    }

    console.log("✅ Login bem-sucedido:", hospede.nome);
    return Response.json({
      token,
      nome: hospede.nome,
      quarto: hospede.quarto,
    });

  } catch (error) {
    console.error("❌ Erro na API POST /login:", error.message);
    return Response.json(
      { error: "Erro ao fazer login: " + error.message },
      { status: 500 }
    );
  }
}
