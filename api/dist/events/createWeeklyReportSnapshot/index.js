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
exports.createWeeklyReportSnapshot = void 0;
var connection_1 = require("../../datasource/connection");
var mory_1 = require("../../datasource/mory");
var createWeeklyReportSnapshot = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var result, moment, year, month, yesterday, weekNumber, allThisWeekEmotionCount, total_count, emotion_count_id, emotion_sql_str, emotion_sql_val_str, emotion_sql_values, idx, emotion_count_sql, num_user, weekly_all_sql, weekly_all_values, userRank, users, idx, userMorys, userMoryCounts, user_emotion_count_id, user_emotion_count, user_emotion_sql_str, user_emotion_sql_val_str, user_emotion_sql_values, emotion_idx, user_emotion_count_sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                moment = require('moment');
                year = String(2021);
                month = String(11);
                yesterday = moment().tz("Asia/Seoul").subtract(59, "d");
                weekNumber = yesterday.isoWeek();
                if (month == "01" && weekNumber > 1) {
                    month = "12";
                    year = String(Number(year) - 1);
                }
                return [4 /*yield*/, (0, mory_1.getAllEmotionCountsInWeek)(Number(year), Number(weekNumber))];
            case 1:
                allThisWeekEmotionCount = _a.sent();
                return [4 /*yield*/, (0, mory_1.getAllMoryCountsInWeek)(Number(year), Number(weekNumber))];
            case 2:
                total_count = _a.sent();
                emotion_count_id = 'weekly-' + String(year) + '-' + String(weekNumber);
                emotion_sql_str = "(id";
                emotion_sql_val_str = "($1, ";
                emotion_sql_values = [];
                emotion_sql_values.push(emotion_count_id);
                for (idx = 0; idx < allThisWeekEmotionCount.length; idx++) {
                    emotion_sql_str += ", " + allThisWeekEmotionCount[idx].emotion;
                    emotion_sql_values.push(allThisWeekEmotionCount[idx].count);
                    emotion_sql_val_str += "$" + String(idx + 2);
                    if (idx < allThisWeekEmotionCount.length - 1) {
                        emotion_sql_val_str += ", ";
                    }
                }
                emotion_sql_str += ')';
                emotion_sql_val_str += ')';
                emotion_count_sql = 'INSERT INTO emotion_count ' + emotion_sql_str + " VALUES " + emotion_sql_val_str + " RETURNING *";
                //??????..? ////////////////
                connection_1.client.query(emotion_count_sql, emotion_sql_values, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res.rows[0]);
                    }
                });
                return [4 /*yield*/, (0, mory_1.getAllUserCountsInWeek)(year, weekNumber)];
            case 3:
                num_user = _a.sent();
                weekly_all_sql = "INSERT INTO weekly_all ( year, month, week_number, total_count, num_user, emotion_count_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
                weekly_all_values = [Number(year), Number(month), Number(weekNumber), total_count, num_user, emotion_count_id];
                connection_1.client.query(weekly_all_sql, weekly_all_values, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res.rows[0]);
                    }
                });
                return [4 /*yield*/, (0, mory_1.getAllUserRanksInWeek)(year, weekNumber)];
            case 4:
                userRank = _a.sent();
                users = Object.keys(userRank);
                idx = 0;
                _a.label = 5;
            case 5:
                if (!(idx < users.length)) return [3 /*break*/, 9];
                return [4 /*yield*/, (0, mory_1.getUserMorysInWeek)(year, weekNumber, users[idx])];
            case 6:
                userMorys = _a.sent();
                userMoryCounts = userMorys.length;
                if (userMoryCounts == 0)
                    return [3 /*break*/, 8];
                user_emotion_count_id = users[idx] + '-' + String(year) + '-' + String(weekNumber);
                return [4 /*yield*/, (0, mory_1.getUserEmotionCountsInWeek)(year, weekNumber, users[idx])];
            case 7:
                user_emotion_count = _a.sent();
                user_emotion_sql_str = "(id";
                user_emotion_sql_val_str = "($1, ";
                user_emotion_sql_values = [];
                user_emotion_sql_values.push(user_emotion_count_id);
                for (emotion_idx = 0; emotion_idx < user_emotion_count.length; emotion_idx++) {
                    user_emotion_sql_str += ", " + user_emotion_count[emotion_idx].emotion;
                    user_emotion_sql_values.push(user_emotion_count[emotion_idx].num);
                    user_emotion_sql_val_str += "$" + String(emotion_idx + 2);
                    if (emotion_idx < user_emotion_count.length - 1) {
                        user_emotion_sql_val_str += ", ";
                    }
                }
                user_emotion_sql_str += ')';
                user_emotion_sql_val_str += ')';
                user_emotion_count_sql = 'INSERT INTO emotion_count ' + user_emotion_sql_str + " VALUES " + user_emotion_sql_val_str + " RETURNING *";
                connection_1.client.query(user_emotion_count_sql, user_emotion_sql_values, function (err, res) {
                    if (err) {
                        console.log(err.stack);
                    }
                    else {
                        console.log(res.rows[0]);
                    }
                });
                _a.label = 8;
            case 8:
                idx++;
                return [3 /*break*/, 5];
            case 9:
                callback(null, result);
                return [2 /*return*/];
        }
    });
}); };
exports.createWeeklyReportSnapshot = createWeeklyReportSnapshot;
//# sourceMappingURL=index.js.map