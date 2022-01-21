import moment from "moment";
import { MoryDateCount } from "../../type";
import { client } from "../connection";

export default async (year, weekNumber, userId): Promise<MoryDateCount[]> => {
  const sql = `SELECT date("createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul'), count(id)
                FROM "Mory"
                WHERE 
                  extract('year' from "createdAt") = $1 
                AND
                  CASE 
                    WHEN extract(ISODOW FROM "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 
                    THEN extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
                    ELSE extract('week' from "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')
                  END = $2
                AND "userId" = $3
                GROUP BY date("createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')
                ;`;

  const values = [year, weekNumber, userId];

  return new Promise((resolve, reject) => {
    client.query<MoryDateCount>(sql, values, (err, result) => {
      if (err) reject(err);

      resolve(postProcessOfMoryDateCount(result.rows, year, weekNumber));
    });
  });
};

const postProcessOfMoryDateCount = (rows: MoryDateCount[], year: number, weekNumber: number) => {
  var i_r = 0;
  var result = [];

  for (let i = 0; i < 7; i++) {
    const d = moment().isoWeek(weekNumber).year(year).day(i).format("YYYY-MM-DD").toString();

    if (i_r < rows.length && moment(rows[i_r].date).format("YYYY-MM-DD").toString() === d) {
      result.push({ date: d, count: Number(rows[i_r].count) });
      i_r += 1;
    } else {
      result.push({ date: d, count: 0 });
    }
  }

  return result;
};
