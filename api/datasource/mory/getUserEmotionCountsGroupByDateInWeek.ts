import moment from "moment";
import { Emotion } from "../../type";
import { client } from "../connection";

type EmotionAndDate = {
  emotion: Emotion;
  date: string;
};

export default async (year, weekNumber, userId): Promise<Emotion[][]> => {
  const sql = `SELECT emotion, date("createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') 
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
                ORDER BY "createdAt" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul';`;

  const values = [year, weekNumber, userId];

  return new Promise((resolve, reject) => {
    client.query<EmotionAndDate>(sql, values, (err, result) => {
      if (err) reject(err);

      resolve(postProcessOfMoryDateCount(result.rows, year, weekNumber));
    });
  });
};

const postProcessOfMoryDateCount = (rows: EmotionAndDate[], year: number, weekNumber: number) => {
  var i_r = 0; // index of rows
  var result = [] as Emotion[][];
  var oneDay = [];
  var i_d = 0; // day of week index
  const DAYS_OF_WEEK = 7;

  while (i_d < DAYS_OF_WEEK) {
    const dateOfWeek = moment().year(year).isoWeek(weekNumber).day(i_d).format("YYYY-MM-DD").toString();

    if (i_r < rows.length) {
      const dateOfRow = moment(rows[i_r].date).format("YYYY-MM-DD").toString();

      if (dateOfRow === dateOfWeek) {
        oneDay.push(rows[i_r].emotion);
        i_r += 1;
      } else {
        result.push(oneDay);
        oneDay = [];
        i_d += 1;
      }
    } else {
      result.push(oneDay);
      i_d += 1;
    }
  }

  return result;
};
