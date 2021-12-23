import { Mory } from "../../type";
import { client } from "../connection";

export default async (year, weekNumber, userId): Promise<Mory[]> => {
  const sql = `SELECT * FROM "Mory"
							WHERE 
								extract('year' from "createdAt") = $1 
							AND
								CASE 
								  WHEN extract(ISODOW FROM "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 
								  THEN extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
								  ELSE extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')
								END = $2
              AND 
                "userId" = $3;`;

  const values = [year, weekNumber, userId];

  return new Promise((resolve, reject) => {
    client.query<Mory>(sql, values, (err, result) => {
      if (err) reject(err);

      resolve(result.rows);
    });
  });
};
