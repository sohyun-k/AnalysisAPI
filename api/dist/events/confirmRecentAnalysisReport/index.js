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
exports.__esModule = true;
exports.confirmRecentAnalysisReport = void 0;
var connection_1 = require("../../datasource/connection");
/**
 * 사용자가 가장 최근 보고서를 읽었음을 알려주는 쿼리.
 * 디바이스에서 리포트를 dismiss할 때 이 쿼리가 실행됨.
 * User 테이블에서 가장 최근에 읽은 리포트 날짜를 기록해둠.
 */
var confirmRecentAnalysisReport = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var args, value, sql, value, sql;
    return __generator(this, function (_a) {
        args = event.arguments;
        switch (args.reportType) {
            case "monthly":
                value = [args.userId, String(args.year) + "-" + String(args.month)];
                sql = 'UPDATE "User" SET recent_monthly_report = $1 WHERE "User".id = $2';
                connection_1.client.query(sql, value, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res.rows[0]);
                    }
                });
                break;
            case "weekly":
                value = [args.userId, String(args.year) + "-" + String(args.weekNumber)];
                sql = 'UPDATE "User" SET recent_weekly_report = $1 WHERE "User".id = $2';
                connection_1.client.query(sql, value, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res.rows[0]);
                    }
                });
                break;
            default:
                console.log("Error");
                break;
        }
        callback(null);
        return [2 /*return*/];
    });
}); };
exports.confirmRecentAnalysisReport = confirmRecentAnalysisReport;
//# sourceMappingURL=index.js.map