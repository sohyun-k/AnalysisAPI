"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var moment_1 = __importDefault(require("moment"));
var connection_1 = require("../connection");
exports["default"] = (function (year, weekNumber, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var sql, values;
    return __generator(this, function (_a) {
        sql = "SELECT emotion, date(\"createdAt\" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') \n                FROM \"Mory\"\n                WHERE \n                  extract('year' from \"createdAt\") = $1 \n                AND\n                  CASE \n                    WHEN extract(ISODOW FROM \"createdAt\" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul') < 7 \n                    THEN extract('week' from \"createdAt\" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul')\n                    ELSE extract('week' from \"createdAt\" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul' + INTERVAL '1 day')\n                  END = $2 \n                AND \"userId\" = $3 \n                ORDER BY \"createdAt\" AT TIME ZONE 'utc' AT TIME ZONE 'Asia/Seoul';";
        values = [year, weekNumber, userId];
        return [2 /*return*/, new Promise(function (resolve, reject) {
                connection_1.client.query(sql, values, function (err, result) {
                    if (err)
                        reject(err);
                    resolve(postProcessOfMoryDateCount(result.rows, year, weekNumber));
                });
            })];
    });
}); });
var postProcessOfMoryDateCount = function (rows, year, weekNumber) {
    var i_r = 0; // index of rows
    var result = [];
    var oneDay = [];
    var i_d = 0; // day of week index
    var DAYS_OF_WEEK = 7;
    while (i_d < DAYS_OF_WEEK) {
        var dateOfWeek = (0, moment_1["default"])().isoWeek(weekNumber).year(year).day(i_d).format("YYYY-MM-DD").toString();
        if (i_r < rows.length) {
            var dateOfRow = (0, moment_1["default"])(rows[i_r].date).format("YYYY-MM-DD").toString();
            if (dateOfRow === dateOfWeek) {
                oneDay.push(rows[i_r].emotion);
                i_r += 1;
            }
            else {
                result.push(oneDay);
                oneDay = [];
                i_d += 1;
            }
        }
        else {
            result.push(oneDay);
            i_d += 1;
        }
    }
    return result;
};
//# sourceMappingURL=getUserEmotionCountsGroupByDateInWeek.js.map