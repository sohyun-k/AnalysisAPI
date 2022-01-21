import { client } from "../connection";

export default async (year, month): Promise<number> => {
    const sql = `SELECT count(id) AS count FROM "Mory"
                WHERE 
                    extract('year' from "createdAt") = $1
                AND
                    extract('month' from "createdAt") = $2;`;
  
    const values = [year, month];
  
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