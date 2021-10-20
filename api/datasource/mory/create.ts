import { client } from "../connection";

export default async (
  id,
  userId,
  emotion,
  latitude,
  longitude,
  content,
  createdAt
) => {
  const sql =
    'INSERT INTO "Mory" (id, "userId", emotion, latitude, longitude, content, "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7)';
  const values = [id, userId, emotion, latitude, longitude, content, createdAt];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      if (result) {
        resolve(true);
      } else {
        resolve(undefined);
      }
    });
  });
};
