import moment from "moment-timezone";
import { WeeklyReport } from "../../type";
import { _getWeeklyReport } from "../getWeeklyReport";

type Arguments = {
  userId: string;
};

type RecentReportNotSeenYet = {
  weeklyReport: WeeklyReport;
  monthlyReport: WeeklyReport;
};

export const getRecentReportNotSeenYet = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const year = moment().tz("Asia/Seoul").year();
  var weekNumber = moment().tz("Asia/Seoul").isoWeek();

  if (moment().tz("Asia/Seoul").day() === 0) {
    weekNumber = moment().tz("Asia/Seoul").add(1, "day").isoWeek();
  }

  const weeklyReport = await _getWeeklyReport({ userId: args.userId, year, weekNumber });

  callback(null, { weeklyReport, monthlyReport: null });
};
