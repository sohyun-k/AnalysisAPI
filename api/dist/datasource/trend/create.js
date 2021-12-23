"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
exports["default"] = (function (userId, type, emotion, date, moryIds) {
    var sql = 'INSERT INTO "Trend" ("userId", type, emotion, date, "moryIds") VALUES ($1, $2, $3, $4, $5) RETURNING *';
    var values = [userId, type, emotion, date, moryIds];
    return new Promise(function (resolve, reject) {
        connection_1.client.query(sql, values, function (err, result) {
            if (err)
                reject(err);
            resolve(result.rows[0].id);
        });
    });
});
//# sourceMappingURL=create.js.map