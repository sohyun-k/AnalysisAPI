import moment from "moment";
import {
  getMonthlyItems,
  getNextItemOrderByCreatedAtDesc,
} from "../../datasource/mory";
import AWS from "aws-sdk";
import { MoryId } from "../../type";

AWS.config.update({ region: "ap-northeast-2" });
const dbclient = new AWS.DynamoDB();

type Arguments = {
  userId: string;
  // '2021-03' : 'YYYY-MM'
  nextToken: string;
  limit: number;
};

type YearMonth = {
  year: number;
  month: number;
};

export const listMonthlyMories = async (event, context, callback) => {
  var args = event.arguments as Arguments;
  var startYearMonth;

  try {
    startYearMonth = getStartYearMonth(args.nextToken);
  } catch (error) {
    callback(error);
  }

  const yearMonthList = getListYearMonth(startYearMonth, args.limit || 3);
  const nextToken = await checkNextToken(args.userId, yearMonthList);
  const results = [];

  for await (const yearMonth of yearMonthList) {
    const moryIds = await getMonthlyItems(
      args.userId,
      yearMonth.year,
      yearMonth.month
    );

    if (moryIds.length > 0) {
      const data = await dbclient
        .batchGetItem(moryIdsBatchParams(moryIds))
        .promise();

      results.push({
        year: yearMonth.year,
        month: yearMonth.month,
        mories: data.Responses["mory"].map((v) =>
          AWS.DynamoDB.Converter.unmarshall(v)
        ),
      });
    }
  }

  callback(null, { nextToken, results });
};

const getStartYearMonth = (nextToken?: string) => {
  var yearMonth = moment();

  if (nextToken) {
    const date = moment(nextToken, "YYYY-MM");

    // nextToken 형식이 맞는지 체크
    if (!date.isValid()) {
      throw new Error("nextToken is not valid");
    }

    yearMonth = date;
  }

  return yearMonth;
};

// limit 수 대로, year-month 부터 month가 하나씩 감소된 yearMonth list 반환
const getListYearMonth = (
  yearMonth: moment.Moment,
  limit: number
): YearMonth[] => {
  var result = [] as YearMonth[];
  const clonedYM = yearMonth.clone();

  for (let i = 0; i < limit; i++) {
    result.push({
      year: Number(clonedYM.format("YYYY")),
      month: Number(clonedYM.format("M")),
    });

    clonedYM.subtract(1, "month");
  }

  return result;
};

const moryIdsBatchParams = (moryIds: MoryId[]) => ({
  RequestItems: {
    mory: {
      Keys: moryIds.map((v) => ({
        id: {
          S: v.id,
        },
        userId: {
          S: v.userId,
        },
      })),
    },
  },
});

const checkNextToken = async (userId: string, yearMonthList: YearMonth[]) => {
  const last = yearMonthList[yearMonthList.length - 1];

  const nextToken = await getNextItemOrderByCreatedAtDesc(
    userId,
    last.year,
    last.month
  );

  if (nextToken && nextToken.length > 0 && "nextToken" in nextToken[0]) {
    return nextToken[0].nextToken;
  } else {
    return null;
  }
};
