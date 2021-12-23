"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
exports["default"] = (function (userId, animal, key, emotion1, emotion2) {
    var sql = 'INSERT INTO "Animal" ("userId", animal, key, emotion1, emotion2, "createdAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    var values = [userId, animal, key, emotion1, emotion2, new Date()];
    return new Promise(function (resolve, reject) {
        connection_1.client.query(sql, values, function (err, result) {
            if (err)
                reject(err);
            resolve(result.rows[0].id);
        });
    });
});
//# sourceMappingURL=create.js.map