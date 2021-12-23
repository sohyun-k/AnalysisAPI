import moment from "moment";
import { client } from "../connection";

type Return = {
  nextToken: string;
};

export default async (
  userId,
  year: number,
  month: number
): Promise<Return[] | undefined> => {
  const { startDate } = getDate(year, month);

  const sql = `SELECT to_char("createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul', 'YYYY-MM') AS "nextToken" FROM "Mory" \ 
		WHERE "userId" = $1 \
    AND "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' < $2 \
    ORDER BY "createdAt" DESC LIMIT 1`;
  const values = [userId, startDate];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows);
    });
  });
};

const getDate = (year, month) => {
  const start = moment(`${year}-${month}`, "YYYY-MM");

  return {
    startDate: start.format("YYYY-MM-DD").toString(),
  };
};
