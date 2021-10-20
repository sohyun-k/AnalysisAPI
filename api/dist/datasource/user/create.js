"use strict";
exports.__esModule = true;
var connection_1 = require("../connection");
exports["default"] = (function (userId) {
    var sql = 'INSERT INTO "User" (id) VALUES ($1)';
    var values = [userId];
    return new Promise(function (resolve, reject) {
        connection_1.client.query(sql, values, function (err, result) {
            if (err)
                reject(err);
            resolve(true);
        });
    });
});
//# sourceMappingURL=create.js.map