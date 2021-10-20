import { User } from "../../type";
import { client } from "../connection";

export default async (userId): Promise<User> => {
  const sql = 'SELECT * FROM "User" WHERE id = $1';
  const values = [userId];

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
