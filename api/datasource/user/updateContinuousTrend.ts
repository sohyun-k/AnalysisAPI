import { client } from "../connection";

export default async (emotion, id, count, userId) => {
  const updateContinuousTrend =
    'UPDATE "User" SET "lastContinuousTrendEmotion" = $1, "lastContinuousTrendId" = $2, "lastContinuousTrendCount" = $3 WHERE id = $4';
  const values = [emotion, id, count, userId];

  return new Promise((resolve, reject) => {
    client.query(updateContinuousTrend, values, (err, result) => {
      if (err) reject(err);

      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
