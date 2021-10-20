import { client } from "../connection";

export default async (emotion, id, userId) => {
  const updateContinuousTrend =
    'UPDATE "User" SET "lastContinuousTrendEmotion" = $1, "lastContinuousTrendId" = $2 WHERE id = $3';
  const values = [emotion, id, userId];

  await client.connect();

  return await client
    .query(updateContinuousTrend, values)
    .then((result) => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    })
    .finally(() => {
      client.end();
    });
};
