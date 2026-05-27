import pool from "@/lib/db";
import bcrypt from "bcrypt";
import { gerarToken } from "@/lib/auth";

export async function POST(req) {
  try {
    console.log("📥 Requisição POST /api/login recebida");

    const { cpf, senha } = await req.json();

    // Validações
    if (!cpf || !senha) {
      console.warn("⚠️ CPF ou senha faltando");
      return Response.json(
        { error: "CPF e senha são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("🔍 Buscando hóspede com CPF:", cpf);

    // Buscar hóspede
    const result = await pool.query(
      "SELECT * FROM hospedes WHERE cpf = $1",
      [cpf]
    );

    const hospede = result.rows[0];

    if (!hospede) {
      console.warn("⚠️ Hóspede não encontrado:", cpf);
      return Response.json(
        { error: "Hóspede não encontrado" },
        { status: 404 }
      );
    }

    console.log("✅ Hóspede encontrado:", hospede.nome);
    console.log("🔐 Comparando senhas...");

    // Comparar senhas
    const senhaCorreta = await bcrypt.compare(senha, hospede.senha);

    if (!senhaCorreta) {
      console.warn("⚠️ Senha inválida para:", hospede.nome);
      return Response.json(
        { error: "Senha inválida" },
        { status: 401 }
      );
    }

    console.log("🎫 Gerando token JWT...");

    // Gerar token
    const token = gerarToken({
      id: hospede.id,
      nome: hospede.nome,
      cpf: hospede.cpf,
      quarto: hospede.quarto,
    });

    if (!token) {
      console.error("❌ Erro ao gerar token");
      return Response.json(
        { error: "Erro ao gerar token de autenticação" },
        { status: 500 }
      );
    }

    console.log("✅ Login bem-sucedido para:", hospede.nome);

    return Response.json({
      token,
      id: hospede.id,
      nome: hospede.nome,
      cpf: hospede.cpf,
      quarto: hospede.quarto,
    });
  } catch (error) {
    console.error("❌ Erro crítico em POST /api/login:", error.message);
    return Response.json(
      {
        error: "Erro ao fazer login",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
