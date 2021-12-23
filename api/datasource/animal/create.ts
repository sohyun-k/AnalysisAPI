import { client } from "../connection";

export default (userId, animal, key, emotion1, emotion2) => {
  const sql =
    'INSERT INTO "Animal" ("userId", animal, key, emotion1, emotion2, "createdAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [userId, animal, key, emotion1, emotion2, new Date()];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      resolve(result.rows[0].id);
    });
  });
};
