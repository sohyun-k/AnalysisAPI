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
exports.lambdaHandler = void 0;
var mory_1 = require("./datasource/mory");
var events_1 = require("./events");
var deletedMory_1 = require("./events/deletedMory/deletedMory");
var lambdaHandler = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                context.callbackWaitsForEmptyEventLoop = false;
                _a = event.field;
                switch (_a) {
                    case "getUserAnimalType": return [3 /*break*/, 1];
                    case "createdMory": return [3 /*break*/, 3];
                    case "deletedMory": return [3 /*break*/, 5];
                    case "getRecentTrends": return [3 /*break*/, 7];
                    case "listMonthlyMories": return [3 /*break*/, 9];
                    case "listTrends": return [3 /*break*/, 11];
                    case "getWeeklyReport": return [3 /*break*/, 12];
                    case "getMonthlyReport": return [3 /*break*/, 14];
                    case "getRecentReportNotSeenYet": return [3 /*break*/, 16];
                    case "createWeeklyReportSnapshot": return [3 /*break*/, 18];
                    case "createMonthlyReportSnapshot": return [3 /*break*/, 20];
                    case "createUserClusterInfo": return [3 /*break*/, 22];
                    case "createGeoClusterCenterInfo": return [3 /*break*/, 24];
                    case "confirmRecentAnalysisReport": return [3 /*break*/, 26];
                }
                return [3 /*break*/, 28];
            case 1: return [4 /*yield*/, (0, events_1.getUserAnimalType)(event, context, callback)];
            case 2:
                _b.sent();
                return [3 /*break*/, 29];
            case 3: return [4 /*yield*/, (0, events_1.createdMory)(event, context, callback)];
            case 4:
                _b.sent();
                return [3 /*break*/, 29];
            case 5: return [4 /*yield*/, (0, deletedMory_1.deletedMory)(event, context, callback)];
            case 6:
                _b.sent();
                return [3 /*break*/, 29];
            case 7: return [4 /*yield*/, (0, events_1.getRecentTrends)(event, context, callback)];
            case 8:
                _b.sent();
                return [3 /*break*/, 29];
            case 9: return [4 /*yield*/, (0, events_1.listMonthlyMories)(event, context, callback)];
            case 10:
                _b.sent();
                return [3 /*break*/, 29];
            case 11: return [3 /*break*/, 29];
            case 12: return [4 /*yield*/, (0, events_1.getWeeklyReport)(event, context, callback)];
            case 13:
                _b.sent();
                return [3 /*break*/, 29];
            case 14: return [4 /*yield*/, (0, mory_1.getMonthlyItems)(event, context, callback)];
            case 15:
                _b.sent();
                return [3 /*break*/, 29];
            case 16: return [4 /*yield*/, (0, events_1.getRecentReportNotSeenYet)(event, context, callback)];
            case 17:
                _b.sent();
                return [3 /*break*/, 29];
            case 18: return [4 /*yield*/, (0, events_1.createWeeklyReportSnapshot)(event, context, callback)];
            case 19:
                _b.sent();
                return [3 /*break*/, 29];
            case 20: return [4 /*yield*/, (0, events_1.createMonthlyReportSnapshot)(event, context, callback)];
            case 21:
                _b.sent();
                return [3 /*break*/, 29];
            case 22: return [4 /*yield*/, (0, events_1.createUserClusterInfo)(event, context, callback)];
            case 23:
                _b.sent();
                return [3 /*break*/, 29];
            case 24: return [4 /*yield*/, (0, events_1.createGeoClusterCenterInfo)(event, context, callback)];
            case 25:
                _b.sent();
                return [3 /*break*/, 29];
            case 26: return [4 /*yield*/, (0, events_1.confirmRecentAnalysisReport)(event, context, callback)];
            case 27:
                _b.sent();
                return [3 /*break*/, 29];
            case 28: return [3 /*break*/, 29];
            case 29: return [2 /*return*/];
        }
    });
}); };
exports.lambdaHandler = lambdaHandler;
//# sourceMappingURL=app.js.map