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
exports.getWeeklyReport = void 0;
var mory_1 = require("../../datasource/mory");
var Gender;
(function (Gender) {
    Gender[Gender["male"] = 0] = "male";
    Gender[Gender["female"] = 1] = "female";
})(Gender || (Gender = {}));
var getWeeklyReport = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var year, weekNumber, userId, emotionCounts, userCounts, moryCounts, userRanks, userEmotionCounts, rankPercentage, createdDates, userMories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                year = 2021;
                weekNumber = 47;
                userId = "UWeGwb8aC2WgBNyRoC3v0N3IHy73";
                return [4 /*yield*/, mory_1.getAllEmotionCountsInWeek(year, weekNumber)];
            case 1:
                emotionCounts = _a.sent();
                return [4 /*yield*/, mory_1.getAllUserCountsInWeek(year, weekNumber)];
            case 2:
                userCounts = _a.sent();
                console.log(userCounts);
                return [4 /*yield*/, mory_1.getAllMoryCountsInWeek(year, weekNumber)];
            case 3:
                moryCounts = _a.sent();
                console.log(moryCounts);
                return [4 /*yield*/, mory_1.getAllUserRanksInWeek(year, weekNumber)];
            case 4:
                userRanks = _a.sent();
                console.log(userRanks);
                return [4 /*yield*/, mory_1.getUserEmotionCountsInWeek(year, weekNumber, userId)];
            case 5:
                userEmotionCounts = _a.sent();
                console.log(userEmotionCounts);
                rankPercentage = (userRanks[userId] / userCounts) * 100;
                console.log(rankPercentage);
                return [4 /*yield*/, mory_1.getUserMoryCountsGroupByDateInWeek(year, weekNumber, userId)];
            case 6:
                createdDates = _a.sent();
                console.log(createdDates.forEach(function (v) { return console.log(v); }));
                return [4 /*yield*/, mory_1.getUserMorysInWeek(year, weekNumber, userId)];
            case 7:
                userMories = _a.sent();
                userMories.forEach(function (v) { return console.log(v.latitude, v.longitude); });
                return [2 /*return*/];
        }
    });
}); };
exports.getWeeklyReport = getWeeklyReport;
//# sourceMappingURL=index.js.map