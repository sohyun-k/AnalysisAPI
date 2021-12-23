import { getRecentItems } from "../../datasource/trend";
import { continuousTrend, pastTrend } from "../../datasource/trend/trends";

type Arguments = {
  id: string;
  userId: string;
  emotion: string;
  location: string;
  text: string;
  createdAt: Date;
};

export const getRecentTrends = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const trends = await getRecentItems(args.userId);

  callback(
    null,
    trends.map((v) => {
      const trendContent =
        v.type === "past" ? pastTrend[v.emotion] : continuousTrend[v.emotion];

      return {
        ...v,
        ...trendContent,
      };
    })
  );
};
