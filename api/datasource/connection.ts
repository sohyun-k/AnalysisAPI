import { Pool } from "pg";

export const client = new Pool({
  user: "postgres",
  host: "analysis.c0itlio259et.ap-northeast-2.rds.amazonaws.com",
  database: "mory_analysis",
  password: "av0cad0Land!",
  // database: "mory_analysis_dev",
  // host: "host.docker.internal",
  // password: "postgres",
  port: 5432,
});

client.on("error", (err, client) => {
  console.error("error on client", err, "on client", client);
  process.exit(-1);
});
