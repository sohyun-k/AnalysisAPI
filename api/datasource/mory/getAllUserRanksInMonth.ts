import { UserRanks } from "../../type";
import { client } from "../connection";

export default async (year, month): Promise<UserRanks> => {
  const sql = `SELECT "userId", RANK () OVER ( ORDER BY count(id) DESC ) FROM "Mory"
                WHERE 
                    extract('year' from "createdAt") = $1 
                AND
                    extract('month' from "createdAt") = $2
                GROUP BY "userId";`;

  const values = [year, month];

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
