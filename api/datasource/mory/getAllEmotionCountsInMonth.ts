import {client} from "../connection";

type EmotionCount = {
    emotion: string;
    count: number;
}
export default async (year, month): Promise<EmotionCount[]> => {
    const sql = `SELECT emotion, count(id) AS count FROM "Mory"
                WHERE 
                    extract('year' from "createdAt") = $1
                AND
                    extract('month' from "createdAt") = $2
                GROUP BY emotion;`;
    const values = [year, month];

    return new Promise((resolve,reject)=> {
        client.query(sql,values,(err,result)=>{
            if(err) reject(err);
            resolve(result.rows as EmotionCount[]);
        });
    });
};



