import { client } from "../connection";

export default async (id) => {
  const sql = 'DELETE FROM "Mory" WHERE id = $1';
  const values = [id];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
