import { getMonthlyItems } from "./datasource/mory";
import {
  confirmRecentAnalysisReport,
  createdMory,
  createGeoClusterCenterInfo,
  createMonthlyReportSnapshot,
  createUserClusterInfo,
  createWeeklyReportSnapshot,
  getRecentReportNotSeenYet,
  getRecentTrends,
  getUserAnimalType,
  getWeeklyReport,
  listMonthlyMories,
} from "./events";
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
    | "createWeeklyReportSnapshot"
    | "createMonthlyReportSnapshot"
    | "createUserClusterInfo"
    | "createGeoClusterCenterInfo"
    | "confirmRecentAnalysisReport"
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
    case "getMonthlyReport":
      await getMonthlyItems(event, context, callback);
      break;
    case "getRecentReportNotSeenYet":
      await getRecentReportNotSeenYet(event, context, callback);
      break;
    case "createWeeklyReportSnapshot":
      await createWeeklyReportSnapshot(event, context, callback);
      break;
    case "createMonthlyReportSnapshot":
      await createMonthlyReportSnapshot(event, context, callback);
      break;
    case "createUserClusterInfo":
      await createUserClusterInfo(event, context, callback);
      break;
    case "createGeoClusterCenterInfo":
      await createGeoClusterCenterInfo(event, context, callback);
      break;
    case "confirmRecentAnalysisReport":
      await confirmRecentAnalysisReport(event, context, callback);
      break;
    default:
      break;
  }
};
