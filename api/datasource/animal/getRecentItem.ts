import { Animal } from "../../type";
import { client } from "../connection";

export default async (userId): Promise<Animal> => {
  const sql =
    'SELECT * FROM "Animal" WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT 1';
  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      if (result.rows && result.rows.length > 0) {
        console.log("rows : ", result.rows);
        resolve(result.rows[0]);
      } else {
        console.log("no animal");
        resolve(undefined);
      }
    });
  });
};
