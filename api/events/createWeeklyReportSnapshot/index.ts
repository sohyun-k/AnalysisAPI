export const createWeeklyReportSnapshot = async (event, context, callback) => {
  var result;

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
};
