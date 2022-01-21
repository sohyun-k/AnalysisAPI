import { Mory } from "../../type";
import { client } from "../connection";

export default async (year, month, userId): Promise<Mory[]> => {
  const sql = `SELECT * FROM "Mory"
                WHERE 
                    extract('year' from "createdAt") = $1 
                AND
                    extract('month' from "createdAt") = $2
                AND 
                    "userId" = $3;`;

  const values = [year, month, userId];

  return new Promise((resolve, reject) => {
    client.query<Mory>(sql, values, (err, result) => {
      if (err) reject(err);

      resolve(result.rows);
    });
  });
};
