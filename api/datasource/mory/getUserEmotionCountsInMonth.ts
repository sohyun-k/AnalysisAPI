import { client } from "../connection";

type EmotionCount = {
  emotion: string;
  num: number;
};

export default async (year, month, userId): Promise<EmotionCount[]> => {
  const sql = `SELECT emotion, count(id) AS num FROM "Mory"
							WHERE 
								extract('year' from "createdAt") = $1 
							AND
                                extract('month' from "createdAt") = $2
                            AND
                                "userId" = $3
							GROUP BY emotion;`;

  const values = [year, month, userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows.map((v) => ({ emotion: v.emotion, num: Number(v.num) })));
    });
  });
};
