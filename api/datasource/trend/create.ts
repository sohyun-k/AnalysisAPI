import { client } from "../connection";

export default (userId, type, emotion, date, moryIds) => {
  const sql =
    'INSERT INTO "Trend" ("userId", type, emotion, date, "moryIds") VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [userId, type, emotion, date, moryIds];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      console.log("id", result.rows[0].id);
      resolve(result.oid);
    });
  });
};
