import { Mory } from "../../type";
import { client } from "../connection";

export default async (userId): Promise<Mory[]> => {
  const sql = `SELECT * FROM "Mory" WHERE "userId" = $1 AND TRUE \
    AND "createdAt" >= NOW()::DATE-INTERVAL '2 week' \
    AND "createdAt" <=  NOW()::DATE+INTERVAL '1 day' ORDER BY "createdAt" DESC`;
  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows as Mory[]);
    });
  });
};
