import pool from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    console.log("📥 Requisição recebida em POST /api/hospedes");
    
    const { nome, cpf, quarto, telefone, senha } = await req.json();
    console.log("📋 Dados recebidos:", { nome, cpf, quarto, telefone });

    // Validações básicas
    if (!nome || !cpf || !quarto || !telefone || !senha) {
      console.warn("⚠️ Campo obrigatório faltando");
      return Response.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("🔍 Verificando se quarto está ocupado...");
    // Verificar se quarto já está ocupado
    const quartoOcupado = await pool.query(
      "SELECT id FROM hospedes WHERE quarto = $1",
      [Number(quarto)]
    );

    if (quartoOcupado.rows.length > 0) {
      console.warn("⚠️ Quarto já está ocupado:", quarto);
      return Response.json(
        { error: "Quarto já está ocupado" },
        { status: 400 }
      );
    }

    console.log("🔍 Verificando se CPF já existe...");
    // Verificar se CPF já existe
    const cpfExistente = await pool.query(
      "SELECT id FROM hospedes WHERE cpf = $1",
      [cpf]
    );

    if (cpfExistente.rows.length > 0) {
      console.warn("⚠️ CPF já cadastrado:", cpf);
      return Response.json(
        { error: "CPF já cadastrado" },
        { status: 400 }
      );
    }

    console.log("🔐 Gerando hash da senha...");
    // Hash da senha
    const hash = await bcrypt.hash(senha, 10);

    console.log("💾 Inserindo novo hóspede no banco...");
    // Inserir novo hóspede
    const result = await pool.query(
      "INSERT INTO hospedes (nome, cpf, quarto, telefone, senha) VALUES ($1,$2,$3,$4,$5) RETURNING id, nome, cpf, quarto, telefone",
      [nome, cpf, Number(quarto), telefone, hash]
    );

    console.log("✅ Hóspede cadastrado com sucesso:", result.rows[0]);
    return Response.json(result.rows[0], { status: 201 });

  } catch (error) {
    console.error("❌ ERRO CRÍTICO na API POST /hospedes:");
    console.error("   Tipo:", error.code || error.name);
    console.error("   Mensagem:", error.message);
    console.error("   Stack:", error.stack);
    
    return Response.json(
      { 
        error: "Erro ao criar reserva",
        details: error.message,
        code: error.code
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    console.log("📥 Requisição recebida em GET /api/hospedes");
    
    const result = await pool.query(
      "SELECT id, nome, cpf, quarto, telefone FROM hospedes ORDER BY quarto ASC"
    );
    
    console.log("✅ Hóspedes recuperados:", result.rows.length);
    return Response.json(result.rows);
    
  } catch (error) {
    console.error("❌ ERRO na API GET /hospedes:", error.message);
    return Response.json(
      { error: "Erro ao buscar hóspedes: " + error.message },
      { status: 500 }
    );
  }
}
