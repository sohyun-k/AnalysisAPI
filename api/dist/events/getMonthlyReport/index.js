"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports._getMonthlyReport = exports.getMonthlyReport = void 0;
var mory_1 = require("../../datasource/mory");
var type_1 = require("../../type");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1["default"].config.update({ region: "ap-northeast-2" });
var dbclient = new aws_sdk_1["default"].DynamoDB();
var getMonthlyReport = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var args, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                args = event.arguments;
                return [4 /*yield*/, (0, exports._getMonthlyReport)(args)];
            case 1:
                result = _a.sent();
                callback(null, result);
                return [2 /*return*/];
        }
    });
}); };
exports.getMonthlyReport = getMonthlyReport;
var _getMonthlyReport = function (args) { return __awaiter(void 0, void 0, void 0, function () {
    var result, year, month, userId, _a, emotionCounts, userCounts, userRanks, moryCounts, _b, previousMonthEmotionCount, thisMonthEmotionCount, userMories, createdDates, createdDatesWithEmotions;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                year = args.year;
                month = args.month;
                userId = args.userId;
                return [4 /*yield*/, getTotalMonthlyData(year, month)];
            case 1:
                _a = _d.sent(), emotionCounts = _a.emotionCounts, userCounts = _a.userCounts, userRanks = _a.userRanks, moryCounts = _a.moryCounts;
                return [4 /*yield*/, getUserMonthlyData(year, month, userId)];
            case 2:
                _b = _d.sent(), previousMonthEmotionCount = _b.previousMonthEmotionCount, thisMonthEmotionCount = _b.thisMonthEmotionCount, userMories = _b.userMories, createdDates = _b.createdDates, createdDatesWithEmotions = _b.createdDatesWithEmotions;
                if (previousMonthEmotionCount.length === 0 && thisMonthEmotionCount.length === 0) {
                    return [2 /*return*/, result];
                }
                _c = {
                    year: year,
                    month: month
                };
                return [4 /*yield*/, getMonthlyStatistic(thisMonthEmotionCount, previousMonthEmotionCount, createdDates, createdDatesWithEmotions, userCounts, userRanks, userId)];
            case 3:
                _c.monthlyStatistic = _d.sent(),
                    _c.userSentimentAnalysis = getUserSentimentAnalysis(previousMonthEmotionCount, thisMonthEmotionCount),
                    _c.userClusterAnalysis = getUserClusterAnalysis(),
                    _c.geoClusterAnalysis = getGeoClusterAnalysis(userMories);
                return [4 /*yield*/, getMories(userMories.map(function (v) { return ({ id: v.id, userId: v.userId }); }))];
            case 4:
                result = (_c.mories = _d.sent(),
                    _c);
                return [2 /*return*/, result];
        }
    });
}); };
exports._getMonthlyReport = _getMonthlyReport;
var getTotalMonthlyData = function (year, month) { return __awaiter(void 0, void 0, void 0, function () {
    var emotionCounts, userCounts, moryCounts, userRanks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, mory_1.getAllEmotionCountsInMonth)(year, month)];
            case 1:
                emotionCounts = _a.sent();
                return [4 /*yield*/, (0, mory_1.getAllUserCountsInMonth)(year, month)];
            case 2:
                userCounts = _a.sent();
                return [4 /*yield*/, (0, mory_1.getAllMoryCountsInMonth)(year, month)];
            case 3:
                moryCounts = _a.sent();
                return [4 /*yield*/, (0, mory_1.getAllUserRanksInMonth)(year, month)];
            case 4:
                userRanks = _a.sent();
                return [2 /*return*/, {
                        emotionCounts: emotionCounts,
                        userCounts: userCounts,
                        moryCounts: moryCounts,
                        userRanks: userRanks
                    }];
        }
    });
}); };
var getUserMonthlyData = function (year, month, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, previousMonthYear, previousMonthNumber, thisMonthEmotionCount, previousMonthEmotionCount, createdDates, createdDatesWithEmotions, userMories;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getPreviousMonthNumber(year, month), previousMonthYear = _a.previousMonthYear, previousMonthNumber = _a.previousMonthNumber;
                return [4 /*yield*/, (0, mory_1.getUserEmotionCountsInMonth)(year, month, userId)];
            case 1:
                thisMonthEmotionCount = _b.sent();
                return [4 /*yield*/, (0, mory_1.getUserEmotionCountsInMonth)(year, month, userId)];
            case 2:
                previousMonthEmotionCount = _b.sent();
                return [4 /*yield*/, getUserMoryCountsGroupByDateInMonth(year, month, userId)];
            case 3:
                createdDates = _b.sent();
                return [4 /*yield*/, getUserEmotionCountsGroupByDateInMonth(year, month, userId)];
            case 4:
                createdDatesWithEmotions = _b.sent();
                return [4 /*yield*/, (0, mory_1.getUserMorysInMonth)(year, month, userId)];
            case 5:
                userMories = _b.sent();
                return [2 /*return*/, {
                        previousMonthEmotionCount: previousMonthEmotionCount,
                        thisMonthEmotionCount: thisMonthEmotionCount,
                        createdDates: createdDates,
                        createdDatesWithEmotions: createdDatesWithEmotions,
                        userMories: userMories
                    }];
        }
    });
}); };
var getMonthlyStatistic = function (thisMonthEmotionCount, previousMonthEmotionCount, createdDates, createdDatesWithEmotions, userCounts, userRanks, userId) { return __awaiter(void 0, void 0, void 0, function () {
    var rankPercentage, getGridHeatmapSources, getGridHeatmapEmotionSources, getMostCreatedEmotion;
    return __generator(this, function (_a) {
        rankPercentage = userId in userRanks ? (userRanks[userId] / userCounts) * 100 : 100.0;
        getGridHeatmapSources = function () {
            var total = createdDates.length;
            var days = createdDates.reduce(function (acc, cur) { return (cur.count > 0 ? acc + 1 : acc); }, 0);
            return {
                text: total + "\uC77C \uC911 " + days + "\uC77C (" + Math.round((days / total) * 100) + "%)",
                data: createdDates.map(function (v) { return v.count; })
            };
        };
        getGridHeatmapEmotionSources = function () {
            var total = createdDatesWithEmotions.length;
            var days = createdDatesWithEmotions.reduce(function (acc, cur) { return (cur.length > 0 ? acc + 1 : acc); }, 0);
            return {
                text: total + "\uC77C \uC911 " + days + "\uC77C (" + Math.round((days / total) * 100) + "%)",
                data: createdDatesWithEmotions
            };
        };
        getMostCreatedEmotion = function () {
            if (thisMonthEmotionCount.length) {
                var maxVal = 0;
                var emo = null;
                thisMonthEmotionCount.forEach(function (v) {
                    if (v.num > maxVal) {
                        maxVal = v.num;
                        emo = v.emotion;
                    }
                });
                return emo;
            }
            return null;
        };
        return [2 /*return*/, {
                totalCount: thisMonthEmotionCount.reduce(function (acc, cur) { return acc + cur.num; }, 0),
                thisMonthEmotionCount: thisMonthEmotionCount,
                previousMonthEmotionCount: previousMonthEmotionCount,
                rankPercent: rankPercentage,
                gridHeatmapSources: getGridHeatmapSources(),
                gridHeatmapEmotionSources: getGridHeatmapEmotionSources(),
                mostCreatedEmotion: getMostCreatedEmotion()
            }];
    });
}); };
var getUserSentimentAnalysis = function (previousMonthEmotionCount, thisMonthEmotionCount) {
    var previousMonth = setimentCountReducer(previousMonthEmotionCount);
    var thisMonth = setimentCountReducer(thisMonthEmotionCount);
    var getSentimentGroupChange = function (group) {
        var pre = previousMonth[group];
        var cur = thisMonth[group];
        var text = "";
        if (pre > 0 && cur > 0) {
            var rateOfChange = Math.round(((cur - pre) / pre) * 100);
            text = rateOfChange + "%";
        }
        else if (pre > 0 && cur === 0) {
            text = "";
        }
        else if (pre === 0 && cur > 0) {
            text = "";
        }
        else {
            text = "";
        }
        return {
            previous: previousMonth[group],
            current: thisMonth[group],
            text: text
        };
    };
    var getBiggestEmotionChange = function () {
        var emotionChanges = compareEmotionChange(thisMonthEmotionCount, previousMonthEmotionCount);
        var biggestEmotionEntry = Object.entries(emotionChanges).sort(function (_a, _b) {
            var a = _a[1];
            var b = _b[1];
            return Math.abs(b.diff) - Math.abs(a.diff);
        })[0];
        if (biggestEmotionEntry[1].diff === 0)
            return [];
        return [
            {
                emotion: biggestEmotionEntry[0],
                change: {
                    current: biggestEmotionEntry[1].value1,
                    previous: biggestEmotionEntry[1].value2,
                    text: biggestEmotionEntry[1].value2 !== 0
                        ? Math.round((biggestEmotionEntry[1].value1 - biggestEmotionEntry[1].value2) / biggestEmotionEntry[1].value2) * 100 + "% " + (biggestEmotionEntry[1].diff > 0 ? "??????" : "??????")
                        : ""
                }
            },
        ];
    };
    return {
        sentimentGroupChange: {
            positive: getSentimentGroupChange("positive"),
            neutral: getSentimentGroupChange("neutral"),
            negative: getSentimentGroupChange("negative")
        },
        theBiggestEmotionChange: getBiggestEmotionChange()
    };
};
var getUserClusterAnalysis = function () {
    return {
        hasUserCluster: false,
        userAge: null,
        userBirthYear: null,
        userGender: null,
        negatvie: {
            population: 0,
            sample: 0,
            text: ""
        },
        positive: {
            population: 0,
            sample: 0,
            text: ""
        },
        neutral: {
            population: 0,
            sample: 0,
            text: ""
        }
    };
};
var getGeoClusterAnalysis = function (userMories) {
    return {
        // TEST
        geoClusterCenters: [{ address: "????????? ???????????? ????????????", latitude: 36.5, longitude: 126.8 }],
        geoHeatmapSources: userMories.map(function (v) { return ({ emotion: type_1.Emotion[v.emotion], latitude: v.latitude, longitude: v.longitude }); })
    };
};
var getMories = function (moryIds) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (moryIds.length === 0) {
                    return [2 /*return*/, []];
                }
                return [4 /*yield*/, dbclient.batchGetItem(moryIdsBatchParams(moryIds)).promise()];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data.Responses["mory"].map(function (v) { return aws_sdk_1["default"].DynamoDB.Converter.unmarshall(v); })];
        }
    });
}); };
var getPreviousMonthNumber = function (year, month) {
    var previousMonthNumber, previousMonthYear;
    if (month === 1) {
        previousMonthNumber = 12;
        previousMonthYear = year - 1;
    }
    else {
        previousMonthNumber = month - 1;
        previousMonthYear = year;
    }
    return { previousMonthYear: previousMonthYear, previousMonthNumber: previousMonthNumber };
};
var setimentCountReducer = function (emotionCounts) {
    return emotionCounts.reduce(function (acc, cur) {
        switch (cur.emotion) {
            case type_1.Emotion.love:
            case type_1.Emotion.happy:
            case type_1.Emotion.fun:
            case type_1.Emotion.excited:
            case type_1.Emotion.proud:
                return __assign(__assign({}, acc), { positive: acc.positive + cur.num });
            case type_1.Emotion.angry:
            case type_1.Emotion.annoyed:
            case type_1.Emotion.gloomy:
            case type_1.Emotion.jealous:
            case type_1.Emotion.nervous:
            case type_1.Emotion.regret:
            case type_1.Emotion.sad:
            case type_1.Emotion.scared:
                return __assign(__assign({}, acc), { negative: acc.negative + cur.num });
            case type_1.Emotion.lethargic:
            case type_1.Emotion.calm:
            case type_1.Emotion.surprised:
                return __assign(__assign({}, acc), { neutral: acc.neutral + cur.num });
            default:
                console.log("Error");
                return acc;
        }
    }, { positive: 0, negative: 0, neutral: 0 });
};
/**
 * 2??? ??????????????? ?????? ??????. emotion1??? ????????????.
 * @param emotions1
 * @param emotions2
 * @returns emotions1 - emotions2
 */
var compareEmotionChange = function (emotions1, emotions2) {
    var emotions1_keyObjects = Object.keys(type_1.Emotion).reduce(function (acc, cur) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[cur] = 0, _a)));
    }, {});
    var emotions2_keyObjects = Object.keys(type_1.Emotion).reduce(function (acc, cur) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[cur] = 0, _a)));
    }, {});
    emotions1.forEach(function (v) { return (emotions1_keyObjects[v.emotion] = v.num); });
    emotions2.forEach(function (v) { return (emotions2_keyObjects[v.emotion] = v.num); });
    return Object.keys(type_1.Emotion).reduce(function (acc, cur) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[cur] = {
            value1: emotions1_keyObjects[cur],
            value2: emotions2_keyObjects[cur],
            diff: emotions1_keyObjects[cur] - emotions2_keyObjects[cur]
        }, _a)));
    }, {});
};
var moryIdsBatchParams = function (moryIds) { return ({
    RequestItems: {
        mory: {
            Keys: moryIds.map(function (v) { return ({
                id: {
                    S: v.id
                },
                userId: {
                    S: v.userId
                }
            }); })
        }
    }
}); };
//# sourceMappingURL=index.js.map