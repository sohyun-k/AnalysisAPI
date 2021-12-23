import { client } from "../connection";

export default async (pastTrendEmotionIdsJson, userId) => {
  const updatePastTrend =
    'UPDATE "User" SET "lastPastTrendEmotionIds" = $1 WHERE id = $2';
  const values = [pastTrendEmotionIdsJson, userId];

  return new Promise((resolve, reject) => {
    client.query(updatePastTrend, values, (err, result) => {
      if (err) reject(err);

      if (result) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
