export const createMonthlyReportSnapshot = async (event, context, callback) => {
  var result;

  //TODO:
  // 현재 year, month 구하기
  // ! 월말이 끝난 시점에 실행되는 쿼리이기 때문에 현재 시간으로 구하면 다음달이 됩니다.

  //TODO: 사용자 전체에 대한 데이터 구하고 저장하기
  // monthly_all 테이블에 저장하는 데이터를 구하기

  callback(null, result);
};
