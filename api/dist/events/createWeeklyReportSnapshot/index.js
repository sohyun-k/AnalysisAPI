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
var createWeeklyReportSnapshot = function (event, context, callback) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        //TODO: year, month, week_number 구하기
        // 매주 일요일이 되는 시점에 돌아가는 함수입니다.
        // moment()를 이용해서 구하면 될 것 같습니다.
        // !) weeknumber를 구하는 다른 코드들(sql, helper)에서는 일요일일 경우 월요일로 치환하여 week number를 구했습니다.
        // 이건, 현재 리포트의 시작과 끝을 일 - 토 로 했기때문입니다. 여기서는 어차피 토요일 다음날에 실행되는 함수이므로 그냥 구해도 될 것 같습니다.
        //TODO: 전체 개수, 전체 emotion 개수 구하기
        // 해당 기간에 만들어진 전체 momory 개수 및 emotion 개수를 구하기
        // total count의 경우 weekly_all 에 total_count에 저장하고,
        // emotion 개수의 경우 emotion_count 테이블에 'weekly-2021-[weekNumber]' 라는 id로 저장한뒤,
        // weekly_all table의 emotion_count_id 에 해당 id를 입력.
        //TODO: 해당 기간, 모모리를 만든 사용자의 수 구하기
        // weekly_all 의 num_user에 저장
        //TODO: userRank 구하기
        // 이 값은 weekly_all에 저장되지는 않지만, 이 다음에 사용자가 모모리를 만든 개수로 rank를 저장하기 위해
        // SQL로 미리 구하는게 빠르고 편할 것 같아서 이 시점에 하는게 적절하다 생각해습니다.
        // >>> 위의 값들은 getWeeklyReport.ts 에 getTotalWeeklyData 함수를 사용하시면 될 것 같습니다.
        //TODO: 사용자 Loop
        // !: null, undefined
        // 제 생각엔 전체 사용자 loop로 돌면서 지난주나, 이번주에 기록한 모모리가 없는 사용자들은 건너띄는 것이 좋을 것 같습니다.
        // 1. 이번주 emotion count => emotion_count table에 'userId-2021-weekNumber' ID 로 저장
        // 2. 이번주에 momory 만든 개수 / 일 => weekly_report에 grid_heatmap_source
        // 3. 이번주 momory 전체 개수 => weekly_report에 totalCount
        // 4. rank percent => weekly_report에 rank
        // 5. 이번주 momory 저장 => weekly_report에 mories
        // 6. 만약 사용자가 user cluster에 관련된 정보를 가지고 있을 경우(현재 이부분이 구현 X) -> weekly_group에 반영
        // 밑 부분은 table column에 추가는 안되어있습니다. 혹시 넣는게 나을까요?
        // 7. 감정 분석 변화. 긍정, 부정, 중립 감정 비율 변화 => sentimentGroupChange
        // 8. 가장 많이 변화한 감정 => theBiggestEmotionChange
        callback(null, result);
        return [2 /*return*/];
    });
}); };
exports.createWeeklyReportSnapshot = createWeeklyReportSnapshot;
//# sourceMappingURL=index.js.map