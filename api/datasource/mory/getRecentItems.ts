import { Mory } from "../../type";
import { client } from "../connection";

/**
 * 가장 최신 mory 3개를 반환
 */
export default async (userId): Promise<Mory[]> => {
  const sql =
    'SELECT * FROM "Mory" WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT 3';
  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows as Mory[]);
    });
  });
};
