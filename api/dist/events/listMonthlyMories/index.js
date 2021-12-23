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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.listMonthlyMories = void 0;
var moment_1 = __importDefault(require("moment"));
var mory_1 = require("../../datasource/mory");
var aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1["default"].config.update({ region: "ap-northeast-2" });
var dbclient = new aws_sdk_1["default"].DynamoDB();
var listMonthlyMories = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var args, startYearMonth, yearMonthList, nextToken, results, yearMonthList_1, yearMonthList_1_1, yearMonth, moryIds, data, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                args = event.arguments;
                try {
                    startYearMonth = getStartYearMonth(args.nextToken);
                }
                catch (error) {
                    callback(error);
                }
                yearMonthList = getListYearMonth(startYearMonth, args.limit || 3);
                return [4 /*yield*/, checkNextToken(args.userId, yearMonthList)];
            case 1:
                nextToken = _b.sent();
                results = [];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 9, 10, 15]);
                yearMonthList_1 = __asyncValues(yearMonthList);
                _b.label = 3;
            case 3: return [4 /*yield*/, yearMonthList_1.next()];
            case 4:
                if (!(yearMonthList_1_1 = _b.sent(), !yearMonthList_1_1.done)) return [3 /*break*/, 8];
                yearMonth = yearMonthList_1_1.value;
                return [4 /*yield*/, mory_1.getMonthlyItems(args.userId, yearMonth.year, yearMonth.month)];
            case 5:
                moryIds = _b.sent();
                if (!(moryIds.length > 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, dbclient
                        .batchGetItem(moryIdsBatchParams(moryIds))
                        .promise()];
            case 6:
                data = _b.sent();
                results.push({
                    year: yearMonth.year,
                    month: yearMonth.month,
                    mories: data.Responses["mory"].map(function (v) {
                        return aws_sdk_1["default"].DynamoDB.Converter.unmarshall(v);
                    })
                });
                _b.label = 7;
            case 7: return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 15];
            case 9:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 10:
                _b.trys.push([10, , 13, 14]);
                if (!(yearMonthList_1_1 && !yearMonthList_1_1.done && (_a = yearMonthList_1["return"]))) return [3 /*break*/, 12];
                return [4 /*yield*/, _a.call(yearMonthList_1)];
            case 11:
                _b.sent();
                _b.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 14: return [7 /*endfinally*/];
            case 15:
                callback(null, { nextToken: nextToken, results: results });
                return [2 /*return*/];
        }
    });
}); };
exports.listMonthlyMories = listMonthlyMories;
var getStartYearMonth = function (nextToken) {
    var yearMonth = moment_1["default"]();
    if (nextToken) {
        var date = moment_1["default"](nextToken, "YYYY-MM");
        // nextToken 형식이 맞는지 체크
        if (!date.isValid()) {
            throw new Error("nextToken is not valid");
        }
        yearMonth = date;
    }
    return yearMonth;
};
// limit 수 대로, year-month 부터 month가 하나씩 감소된 yearMonth list 반환
var getListYearMonth = function (yearMonth, limit) {
    var result = [];
    var clonedYM = yearMonth.clone();
    for (var i = 0; i < limit; i++) {
        result.push({
            year: Number(clonedYM.format("YYYY")),
            month: Number(clonedYM.format("M"))
        });
        clonedYM.subtract(1, "month");
    }
    return result;
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
var checkNextToken = function (userId, yearMonthList) { return __awaiter(void 0, void 0, void 0, function () {
    var last, nextToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                last = yearMonthList[yearMonthList.length - 1];
                return [4 /*yield*/, mory_1.getNextItemOrderByCreatedAtDesc(userId, last.year, last.month)];
            case 1:
                nextToken = _a.sent();
                if (nextToken && nextToken.length > 0 && "nextToken" in nextToken[0]) {
                    return [2 /*return*/, nextToken[0].nextToken];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=index.js.map