import moment from "moment";
import { MoryId } from "../../type";
import { client } from "../connection";

export default async (
  userId,
  year: number,
  month: number
): Promise<MoryId[]> => {
  const { startDate, endDate } = getDateRange(year, month);

  const sql = `SELECT id, "userId" FROM "Mory" \ 
		WHERE "userId" = $1 \
    AND "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' >= $2 \
    AND "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' < $3 \  
		ORDER BY "createdAt" DESC`;
  const values = [userId, startDate, endDate];

  return new Promise((resolve, reject) => {
    client.query(sql, values, (err, result) => {
      if (err) reject(err);
      resolve(result.rows);
    });
  });
};

const getDateRange = (year, month) => {
  const start = moment(`${year}-${month}`, "YYYY-MM");
  const end = start.clone().add(1, "month");

  return {
    startDate: start.format("YYYY-MM-DD").toString(),
    endDate: end.format("YYYY-MM-DD").toString(),
  };
};
