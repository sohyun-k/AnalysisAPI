import { createdMory } from "./events";

type Event = {
  field: "createdMory" | "listTrend";
  arguments: any;
};

export const lambdaHandler = async (event: Event, context, callback) => {
  switch (event.field) {
    case "createdMory":
      await createdMory(event, context, callback);
      break;
    default:
      break;
  }
};
