"use strict";
exports.__esModule = true;
exports.client = void 0;
var pg_1 = require("pg");
exports.client = new pg_1.Pool({
    user: "postgres",
    host: "analysis.c0itlio259et.ap-northeast-2.rds.amazonaws.com",
    database: "mory_analysis",
    password: "av0cad0Land!",
    port: 5432
});
//# sourceMappingURL=connection.js.map