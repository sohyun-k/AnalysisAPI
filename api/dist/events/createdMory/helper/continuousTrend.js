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
exports.calcContinuousTrend = void 0;
var mory_1 = require("../../../datasource/mory");
var notification_1 = require("../../../datasource/notification");
var trend_1 = require("../../../datasource/trend");
var user_1 = require("../../../datasource/user");
var calcContinuousTrend = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var user, mories, lastEmotion, newTrendId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, user_1.getUser)(userId)];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, user_1.createUser)(userId)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, user_1.getUser)(userId)];
            case 3:
                user = _a.sent();
                _a.label = 4;
            case 4: return [4 /*yield*/, (0, mory_1.getRecentItems)(userId)];
            case 5:
                mories = _a.sent();
                lastEmotion = mories[0].emotion;
                if (!(mories.length !== 3)) return [3 /*break*/, 9];
                if (!(mories.length === 2)) return [3 /*break*/, 7];
                if (!(user.lastContinuousTrendEmotion === lastEmotion)) return [3 /*break*/, 7];
                return [4 /*yield*/, (0, user_1.updateContinuousTrend)(lastEmotion, null, user.lastContinuousTrendCount + 1, userId)];
            case 6:
                _a.sent();
                return [2 /*return*/];
            case 7: return [4 /*yield*/, (0, user_1.updateContinuousTrend)(lastEmotion, null, 1, userId)];
            case 8:
                _a.sent();
                return [2 /*return*/];
            case 9:
                if (!(user.lastContinuousTrendEmotion &&
                    user.lastContinuousTrendEmotion === lastEmotion)) return [3 /*break*/, 15];
                if (!(user.lastContinuousTrendCount === 2)) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, trend_1.createTrend)(userId, "continuous", lastEmotion, new Date(), mories.map(function (v) { return v.id; }))];
            case 10:
                newTrendId = _a.sent();
                (0, notification_1.pushContinuousTrend)(userId, newTrendId, lastEmotion, new Date(), mories.map(function (v) { return v.id; }));
                // update
                return [4 /*yield*/, (0, user_1.updateContinuousTrend)(null, newTrendId, 0, userId)];
            case 11:
                // update
                _a.sent();
                return [3 /*break*/, 14];
            case 12: 
            // update
            return [4 /*yield*/, (0, user_1.updateContinuousTrend)(lastEmotion, null, user.lastContinuousTrendCount + 1, userId)];
            case 13:
                // update
                _a.sent();
                _a.label = 14;
            case 14: return [3 /*break*/, 17];
            case 15: 
            // emotion 이 다른 경우
            return [4 /*yield*/, (0, user_1.updateContinuousTrend)(lastEmotion, null, 1, userId)];
            case 16:
                // emotion 이 다른 경우
                _a.sent();
                _a.label = 17;
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.calcContinuousTrend = calcContinuousTrend;
//# sourceMappingURL=continuousTrend.js.map