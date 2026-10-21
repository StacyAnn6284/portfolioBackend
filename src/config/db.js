import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;

dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connection pool established with Database");
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle database client", err);
  process.exit(-1);
});

export default pool;
