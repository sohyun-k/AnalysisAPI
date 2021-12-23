import { Trend } from "../../type";
import { client } from "../connection";

export default async (userId): Promise<Trend[]> => {
  const sql = `SELECT * FROM "Trend" WHERE "userId" = $1 AND TRUE \
    AND date >= NOW()::DATE-INTERVAL '3 week'\
    AND date <=  NOW()::DATE+INTERVAL '1 day' ORDER BY date DESC;`;
  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows as Trend[]);
    });
  });
};
