import { client } from "../connection";

type EmotionCount = {
  emotion: string;
  count: number;
};

export default async (userId): Promise<EmotionCount[]> => {
  const sql = `SELECT emotion, COUNT(id) FROM "Mory"\
    WHERE "userId" = $1 \
    AND "createdAt" >= NOW()::DATE-INTERVAL '1 month' \
    AND "createdAt" <=  NOW()::DATE+INTERVAL '1 day'  \
    GROUP BY emotion \
    ORDER BY count DESC;`;

  const values = [userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows as EmotionCount[]);
    });
  });
};
