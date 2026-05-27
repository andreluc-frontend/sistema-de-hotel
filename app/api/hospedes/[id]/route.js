import pool from "@/lib/db";

export async function DELETE(req, context) {
  const { id } = await context.params;
  await pool.query("DELETE FROM hospedes WHERE id=$1", [Number(id)]);
  return Response.json({ ok: true });
}
