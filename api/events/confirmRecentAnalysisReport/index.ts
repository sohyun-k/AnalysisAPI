import { client } from "../../datasource/connection";
type Arguments = {
  reportType: "weekly" | "monthly";
  userId: string;
  year: number;
  month: number;
  weekNumber: number;
};

/**
 * 사용자가 가장 최근 보고서를 읽었음을 알려주는 쿼리.
 * 디바이스에서 리포트를 dismiss할 때 이 쿼리가 실행됨.
 * User 테이블에서 가장 최근에 읽은 리포트 날짜를 기록해둠.
 */
export const confirmRecentAnalysisReport = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  switch (args.reportType) {
    case "monthly":
      // userId를 사용해서 'year-month' 저장
      var value = [args.userId, String(args.year)+"-"+String(args.month)];
      var sql = 'UPDATE "User" SET recent_monthly_report = $1 WHERE "User".id = $2';
      client.query(sql, value, (err,res) => {
        if(err) {
          console.log(err.stack);
        }
        else{
          console.log(res.rows[0]);
        }
      });
      break;
    case "weekly":
      // userId를 사용해서 'year-weekNumber' 저장
      var value = [args.userId, String(args.year)+"-"+String(args.weekNumber)];
      var sql = 'UPDATE "User" SET recent_weekly_report = $1 WHERE "User".id = $2';
      client.query(sql, value, (err,res) => {
        if(err) {
          console.log(err.stack);
        }
        else{
          console.log(res.rows[0]);
        }
      });
      break;
    default:
      console.log("Error");
      break;
  }

  callback(null);
};
