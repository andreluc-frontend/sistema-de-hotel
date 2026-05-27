import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const hospedesTable = pgTable("hospedes", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  cpf: text("cpf").notNull().unique(),
  quarto: integer("quarto").notNull().unique(),
  telefone: text("telefone").notNull(),
  senha: text("senha").notNull(),
});

export const insertHospedeSchema = createInsertSchema(hospedesTable).omit({ id: true });
export type InsertHospede = z.infer<typeof insertHospedeSchema>;
export type Hospede = typeof hospedesTable.$inferSelect;
