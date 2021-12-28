import { createdMory, getRecentReportNotSeenYet, getRecentTrends, getUserAnimalType, getWeeklyReport, listMonthlyMories } from "./events";
import { deletedMory } from "./events/deletedMory/deletedMory";

type Event = {
  field:
    | "createdMory"
    | "deletedMory"
    | "listTrends"
    | "getUserAnimalType"
    | "listMonthlyMories"
    | "getWeeklyReport"
    | "getMonthlyReport"
    | "getRecentReportNotSeenYet"
    | "getRecentTrends";
  arguments: any;
};

export const lambdaHandler = async (event: Event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  switch (event.field) {
    case "getUserAnimalType":
      await getUserAnimalType(event, context, callback);
      break;
    case "createdMory":
      await createdMory(event, context, callback);
      break;
    case "deletedMory":
      await deletedMory(event, context, callback);
      break;
    case "getRecentTrends":
      await getRecentTrends(event, context, callback);
      break;
    case "listMonthlyMories":
      await listMonthlyMories(event, context, callback);
      break;
    case "listTrends":
      break;
    case "getWeeklyReport":
      await getWeeklyReport(event, context, callback);
      break;
    case "getRecentReportNotSeenYet":
      await getRecentReportNotSeenYet(event, context, callback);
      break;
    default:
      break;
  }
};
