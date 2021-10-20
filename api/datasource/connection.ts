import { Pool } from "pg";

export const client = new Pool({
  user: "postgres",
  host: "analysis.c0itlio259et.ap-northeast-2.rds.amazonaws.com",
  database: "mory_analysis",
  password: "av0cad0Land!",
  port: 5432,
});
