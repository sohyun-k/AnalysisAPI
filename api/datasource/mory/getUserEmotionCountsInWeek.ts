import { client } from "../connection";

type EmotionCount = {
  emotion: string;
  num: number;
};

export default async (year, weekNumber, userId): Promise<EmotionCount[]> => {
  const sql = `SELECT emotion, count(id) AS num FROM "Mory"
							WHERE 
								extract('year' from "createdAt") = $1 
							AND
								CASE 
								  WHEN extract(ISODOW FROM "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 
								  THEN extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
								  ELSE extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')
								END = $2
              AND
                "userId" = $3
							GROUP BY emotion;`;

  const values = [year, weekNumber, userId];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows.map((v) => ({ emotion: v.emotion, num: Number(v.num) })));
    });
  });
};
