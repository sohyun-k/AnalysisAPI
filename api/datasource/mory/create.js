const { client } = require("../connection.js");

const create = async (
  id,
  userId,
  emotion,
  latitude,
  longitude,
  content,
  createdAt
) => {
  const sql =
    'INSERT INTO "Mory" (id, "userId", emotion, latitude, longitude, content, "createdAt") VALUES($1, $2, $3, $4, $5, $6, $7)';
  const values = [id, userId, emotion, latitude, longitude, content, createdAt];

  client.connect();
  const res = await client.query(sql, values);
  client.end();

  console.log(res);
  return res;
};

module.exports = {
  create,
};
