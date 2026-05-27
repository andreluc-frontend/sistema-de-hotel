import pool from "@/lib/db";

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const result = await pool.query(
      "DELETE FROM hospedes WHERE id=$1 RETURNING id",
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Hóspede não encontrado" }, { status: 404 });
    }

    console.log("✅ Hóspede deletado:", id);
    return Response.json({ ok: true, deleted: result.rows[0] });

  } catch (error) {
    console.error("❌ Erro na API DELETE /hospedes/[id]:", error.message);
    return Response.json(
      { error: "Erro ao deletar hóspede: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json({ error: "ID não fornecido" }, { status: 400 });
    }

    const result = await pool.query(
      "SELECT id, nome, cpf, quarto, telefone FROM hospedes WHERE id=$1",
      [Number(id)]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Hóspede não encontrado" }, { status: 404 });
    }

    return Response.json(result.rows[0]);

  } catch (error) {
    console.error("❌ Erro na API GET /hospedes/[id]:", error.message);
    return Response.json(
      { error: "Erro ao buscar hóspede: " + error.message },
      { status: 500 }
    );
  }
}
