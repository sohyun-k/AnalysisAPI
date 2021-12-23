import { client } from "../connection";

type UserRanks = {
  [key: string]: number;
};

export default async (year, weekNumber): Promise<UserRanks> => {
  const sql = `SELECT "userId", RANK () OVER ( ORDER BY count(id) DESC ) FROM "Mory"
							WHERE 
								extract('year' from "createdAt") = $1 
							AND
								CASE 
								  WHEN extract(ISODOW FROM "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 
								  THEN extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
								  ELSE extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')
								END = $2
              GROUP BY "userId";`;

  const values = [year, weekNumber];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);

      const flattendUserRanks: UserRanks = result.rows.reduce((acc, curVal) => {
        acc[curVal.userId] = Number(curVal.rank);
        return acc;
      }, {});

      resolve(flattendUserRanks);
    });
  });
};
