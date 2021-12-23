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
exports.calcAnimalType = void 0;
var animal_1 = require("../../../datasource/animal");
var mory_1 = require("../../../datasource/mory");
var moment_1 = __importDefault(require("moment"));
var animals_1 = require("../../../datasource/animal/animals");
var notification_1 = require("../../../datasource/notification");
/**
 * 1) 최근 animal type 조회
 *
 * 2) 최근 animal type이 null or 일주일 이상 지났으면 새로 체크 및 업데이트
 *
 * 2-1) 만약 최근 한달간 momory 가 10개 이상이 아니면 continue
 *
 * 2-2) 최근 한달간 momory가 10개 이상이면 calc 시작.
 *
 *
 *
 * 2) 안지났으면 그대로
 */
var calcAnimalType = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var animal, emotionCounts, total, selectedEmotions, animalType;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, animal_1.getRecentAnimal(userId)];
            case 1:
                animal = _a.sent();
                console.log(animal);
                if (!(!animal ||
                    (animal && moment_1["default"]().diff(moment_1["default"](animal.createdAt).toDate(), "days") > 7))) return [3 /*break*/, 4];
                return [4 /*yield*/, mory_1.getEmotionCountsInMonth(userId)];
            case 2:
                emotionCounts = _a.sent();
                console.log(emotionCounts);
                total = 0;
                emotionCounts.forEach(function (v) { return (total += Number(v.count)); });
                console.log(total);
                if (total < 10) {
                    return [2 /*return*/];
                }
                selectedEmotions = [emotionCounts[0].emotion];
                if (emotionCounts.length > 1 &&
                    (emotionCounts[0].count / total) * 100 -
                        (emotionCounts[1].count / total) * 100 <=
                        10) {
                    selectedEmotions.push(emotionCounts[1].emotion);
                }
                animalType = animals_1.getAnimalType(selectedEmotions);
                console.log(animalType);
                // create animal
                if (animal && animal.animal === animalType.animal) {
                    return [2 /*return*/];
                }
                return [4 /*yield*/, animal_1.createAnimal(userId, animalType.animal, animalType.key, selectedEmotions[0], selectedEmotions.length > 1 ? selectedEmotions[1] : "")];
            case 3:
                _a.sent();
                //TODO: notification
                notification_1.pushAnimalType(userId, animalType.key);
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.calcAnimalType = calcAnimalType;
//# sourceMappingURL=animalType.js.map