import { client } from "../connection";

export default (userId) => {
  const sql = 'INSERT INTO "User" (id) VALUES ($1)';
  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(true);
    });
  });
};
