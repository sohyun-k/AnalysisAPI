import { client } from "../connection";

export default async (year, weekNumber): Promise<number> => {
  const sql = `SELECT count(DISTINCT "userId") AS count FROM "Mory"
							WHERE 
								extract('year' from "createdAt") = $1 
							AND
								CASE 
								  WHEN extract(ISODOW FROM "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 
								  THEN extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
								  ELSE extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')
								END = $2;`;

  const values = [year, weekNumber];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      if (result.rows.length > 0 && "count" in result.rows[0]) {
        resolve(Number(result.rows[0].count));
      } else {
        resolve(0);
      }
    });
  });
};
