import { client } from "../connection";

export default async (id) => {
  const sql = 'DELETE FROM "Mory" WHERE id = $1';
  const values = [id];

  return await client
    .query(sql, values)
    .then((result) => true)
    .catch((error) => {
      console.error(error);
      return false;
    })
    .finally(() => {
      client.end();
    });
};
