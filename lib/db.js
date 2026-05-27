import pkg from "pg";
const { Pool } = pkg;

// Validar se as variáveis de ambiente existem
if (!process.env.DB_USER || !process.env.DB_HOST || !process.env.DB_DATABASE || !process.env.DB_PASSWORD) {
  console.warn("⚠️ Variáveis de ambiente não configuradas. Usando valores padrão.");
}

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "hotel",
  password: process.env.DB_PASSWORD || "postgres",
  port: parseInt(process.env.DB_PORT || "5432"),
});

// Testar conexão ao iniciar
pool.on("error", (err) => {
  console.error("❌ Erro na pool de conexão:", err.message);
});

pool.on("connect", () => {
  console.log("✅ Conectado ao banco de dados!");
});

export default pool;
