import { Trend } from "../../type";
import { client } from "../connection";

export default async (trendId): Promise<Trend> => {
  const sql = 'SELECT * FROM "Trend" WHERE id = $1';
  const values = [trendId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      if (result.rows) {
        resolve(result.rows[0]);
      } else {
        resolve(undefined);
      }
    });
  });
};
