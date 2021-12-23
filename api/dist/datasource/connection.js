"use strict";
exports.__esModule = true;
exports.client = void 0;
var pg_1 = require("pg");
exports.client = new pg_1.Pool({
    user: "postgres",
    // host: "analysis.c0itlio259et.ap-northeast-2.rds.amazonaws.com",
    host: "host.docker.internal",
    database: "mory_analysis_dev",
    // password: "av0cad0Land!",
    password: "postgres",
    port: 5432
});
exports.client.on("error", function (err, client) {
    console.error("error on client", err, "on client", client);
    process.exit(-1);
});
//# sourceMappingURL=connection.js.map