import moment from "moment";
import {
  getAllEmotionCountsInMonth,
  getAllMoryCountsInMonth,
  getAllUserCountsInMonth,
  getAllUserRanksInMonth,
//  getUserEmotionCountsGroupByDateInMonth,
  getUserEmotionCountsInMonth,
// getUserMoryCountsGroupByDateInMonth,
  getUserMorysInMonth,
} from "../../datasource/mory";
import {
  ChangeResult,
  Emotion,
  EmotionChange,
  EmotionCount,
  GeoClusterAnalysis,
  GridHeatmapEmotionSources,
  GridHeatmapSources,
  Mory,
  MoryDateCount,
  UserClusterAnalysis,
  UserRanks,
  UserSentimentAnalysis,
  MonthlyReport,
  MonthlyStatistic,
} from "../../type";
import AWS from "aws-sdk";
import { MoryId } from "../../type";

AWS.config.update({ region: "ap-northeast-2" });
const dbclient = new AWS.DynamoDB();


type Arguments = {
  userId: string;
  year: number;
  month: number;
};

export const getMonthlyReport = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const result = await _getMonthlyReport(args);

  callback(null, result);
};

export const _getMonthlyReport = async (args: Arguments): Promise<MonthlyReport> => {
  var result: MonthlyReport;

  const year = args.year;
  const month = args.month;
  const userId = args.userId;

  // getThisMonthInfo???
  const {emotionCounts, userCounts, userRanks, moryCounts } = await getTotalMonthlyData(year, month);
  const {previousMonthEmotionCount, thisMonthEmotionCount, userMories, createdDates, createdDatesWithEmotions } = await getUserMonthlyData(
    year, month, userId
  );

  if (previousMonthEmotionCount.length === 0 && thisMonthEmotionCount.length === 0){
    return result;
  }

  result = {
    year,
    month,
    monthlyStatistic: await getMonthlyStatistic(
      thisMonthEmotionCount,
      previousMonthEmotionCount,
      createdDates,
      createdDatesWithEmotions,
      userCounts,
      userRanks,
      userId
    ),
    userSentimentAnalysis: getUserSentimentAnalysis(previousMonthEmotionCount, thisMonthEmotionCount),
    userClusterAnalysis: getUserClusterAnalysis(),
    geoClusterAnalysis: getGeoClusterAnalysis(userMories),
    mories: await getMories(userMories.map((v)=>({id: v.id, userId: v.userId}))),
  };
  return result;
}

const getTotalMonthlyData = async (year: number, month: number) => {
  // 1달 감정별 개수 조회
  const emotionCounts = await getAllEmotionCountsInMonth(year, month);
  // 1달 사용자 수 조회
  const userCounts = await getAllUserCountsInMonth(year, month);
  // 1달 전체 mory 개수 조회
  const moryCounts = await getAllMoryCountsInMonth(year, month);
  // 1달 전체 user rank objects
  const userRanks = await getAllUserRanksInMonth(year, month);

  return {
    emotionCounts,
    userCounts,
    moryCounts,
    userRanks,
  };
};

const getUserMonthlyData = async (year: number, month: number, userId: string) => {
  const { previousMonthYear, previousMonthNumber } = getPreviousMonthNumber(year, month);
  
  const thisMonthEmotionCount = await getUserEmotionCountsInMonth(year, month, userId);

  const previousMonthEmotionCount = await getUserEmotionCountsInMonth(year, month, userId);

  const createdDates = await getUserMoryCountsGroupByDateInMonth(year, month, userId);

  const createdDatesWithEmotions = await getUserEmotionCountsGroupByDateInMonth(year, month, userId);
  
  const userMories = await getUserMorysInMonth(year, month, userId);

  return {
    previousMonthEmotionCount,
    thisMonthEmotionCount,
    createdDates,
    createdDatesWithEmotions,
    userMories,
  };
};


const getMonthlyStatistic = async (
  thisMonthEmotionCount: EmotionCount[],
  previousMonthEmotionCount: EmotionCount[],
  createdDates: MoryDateCount[],
  createdDatesWithEmotions: Emotion[][],
  userCounts: number,
  userRanks: UserRanks,
  userId: string
): Promise<MonthlyStatistic> => {
  const rankPercentage = userId in userRanks ? (userRanks[userId] / userCounts) * 100 : 100.0;

  const getGridHeatmapSources = (): GridHeatmapSources => {
    const total = createdDates.length;
    const days = createdDates.reduce((acc,cur) => (cur.count>0 ? acc + 1 : acc), 0);

    return {
      text: `${total}일 중 ${days}일 (${Math.round((days / total) * 100)}%)`,
      data: createdDates.map((v) => v.count),
    };
  };

  const getGridHeatmapEmotionSources = (): GridHeatmapEmotionSources => {
    const total = createdDatesWithEmotions.length;
    const days = createdDatesWithEmotions.reduce((acc, cur) => (cur.length > 0 ? acc + 1 : acc), 0);

    return {
      text: `${total}일 중 ${days}일 (${Math.round((days / total) * 100)}%)`,
      data: createdDatesWithEmotions,
    };
  };

  const getMostCreatedEmotion = (): Emotion => {
    if (thisMonthEmotionCount.length) {
      var maxVal = 0;
      var emo = null;

      thisMonthEmotionCount.forEach((v)=> {
        if (v.num > maxVal) {
          maxVal = v.num;
          emo = v.emotion;
        }
      });

      return emo;
    }

    return null;
  };

  return {
    totalCount: thisMonthEmotionCount.reduce((acc, cur) => acc + cur.num, 0),
    thisMonthEmotionCount,
    previousMonthEmotionCount,
    rankPercent: rankPercentage,
    gridHeatmapSources: getGridHeatmapSources(),
    gridHeatmapEmotionSources: getGridHeatmapEmotionSources(),
    mostCreatedEmotion: getMostCreatedEmotion(),
  };
};

const getUserSentimentAnalysis = (previousMonthEmotionCount: EmotionCount[], thisMonthEmotionCount: EmotionCount[]): UserSentimentAnalysis => {
  const previousMonth = setimentCountReducer(previousMonthEmotionCount);
  const thisMonth = setimentCountReducer(thisMonthEmotionCount);

  const getSentimentGroupChange = (group: "positive" | "negative" | "neutral"): ChangeResult => {
    const pre = previousMonth[group];
    const cur = thisMonth[group];
    var text = "";

    if (pre > 0 && cur > 0){
      const rateOfChange = Math.round(((cur - pre) / pre) * 100);
      text = `${rateOfChange}%`;
    } else if (pre > 0 && cur === 0) {
      text = "";
    } else if (pre === 0 && cur > 0) {
      text = "";
    } else {
      text = "";
    }
    
    return {
      previous: previousMonth[group],
      current: thisMonth[group],
      text,
    };
  };

  const getBiggestEmotionChange = (): EmotionChange[] => {
    const emotionChanges = compareEmotionChange(thisMonthEmotionCount, previousMonthEmotionCount);
    const biggestEmotionEntry = Object.entries(emotionChanges).sort(([, a], [, b]) => Math.abs(b.diff) - Math.abs(a.diff))[0];

    if (biggestEmotionEntry[1].diff === 0) return [];

    return [
      {
        emotion: biggestEmotionEntry[0],
        change: {
          current: biggestEmotionEntry[1].value1,
          previous: biggestEmotionEntry[1].value2,
          text:
            biggestEmotionEntry[1].value2 !== 0
              ? `${Math.round((biggestEmotionEntry[1].value1 - biggestEmotionEntry[1].value2) / biggestEmotionEntry[1].value2) * 100}% ${
                  biggestEmotionEntry[1].diff > 0 ? "증가" : "감소"
                }`
              : "",
        },
      },
    ];
  };

  return {
    sentimentGroupChange: {
      positive: getSentimentGroupChange("positive"),
      neutral: getSentimentGroupChange("neutral"),
      negative: getSentimentGroupChange("negative"),
    },
    theBiggestEmotionChange: getBiggestEmotionChange(),
  };
};

const getUserClusterAnalysis = (): UserClusterAnalysis => {
  return {
    hasUserCluster: false,
    userAge: null,
    userBirthYear: null,
    userGender: null,
    negatvie: {
      population: 0,
      sample: 0,
      text: "",
    },
    positive: {
      population: 0,
      sample: 0,
      text: "",
    },
    neutral: {
      population: 0,
      sample: 0,
      text: "",
    },
  };
};

const getGeoClusterAnalysis = (userMories: Mory[]): GeoClusterAnalysis => {
  return {
    // TEST
    geoClusterCenters: [{ address: "서울시 영등포구 여의도동", latitude: 36.5, longitude: 126.8 }],
    geoHeatmapSources: userMories.map((v) => ({ emotion: Emotion[v.emotion], latitude: v.latitude, longitude: v.longitude })),
  };
};

const getMories = async (moryIds: MoryId[]) => {
  if (moryIds.length === 0) {
    return [];
  }

  const data = await dbclient.batchGetItem(moryIdsBatchParams(moryIds)).promise();

  return data.Responses["mory"].map((v) => AWS.DynamoDB.Converter.unmarshall(v));
};

const getPreviousMonthNumber = (year: number, month: number) => {
  var previousMonthNumber, previousMonthYear;
  if(month === 1){
    previousMonthNumber = 12;
    previousMonthYear = year - 1;
  } else {
    previousMonthNumber = month - 1;
    previousMonthYear = year;
  }
  return {previousMonthYear, previousMonthNumber};
}

// startDate & endDate 필요..?

type SentimentCount = {
  positive: number;
  negative: number;
  neutral: number;
};

const setimentCountReducer = (emotionCounts: EmotionCount[]) =>
  emotionCounts.reduce(
    (acc: SentimentCount, cur) => {
      switch (cur.emotion) {
        case Emotion.love:
        case Emotion.happy:
        case Emotion.fun:
        case Emotion.excited:
        case Emotion.proud:
          return { ...acc, positive: acc.positive + cur.num };
        case Emotion.angry:
        case Emotion.annoyed:
        case Emotion.gloomy:
        case Emotion.jealous:
        case Emotion.nervous:
        case Emotion.regret:
        case Emotion.sad:
        case Emotion.scared:
          return { ...acc, negative: acc.negative + cur.num };
        case Emotion.lethargic:
        case Emotion.calm:
        case Emotion.surprised:
          return { ...acc, neutral: acc.neutral + cur.num };
        default:
          console.log("Error");
          return acc;
      }
    },
    { positive: 0, negative: 0, neutral: 0 }
  );

type EK = {
  [key in Emotion]: {
    value1: number;
    value2: number;
    diff: number;
  };
};

/**
 * 2개 감정배열의 개수 비교. emotion1을 기준으로.
 * @param emotions1
 * @param emotions2
 * @returns emotions1 - emotions2
 */
 const compareEmotionChange = (emotions1: EmotionCount[], emotions2: EmotionCount[]): EK => {
  const emotions1_keyObjects = Object.keys(Emotion).reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});
  const emotions2_keyObjects = Object.keys(Emotion).reduce((acc, cur) => ({ ...acc, [cur]: 0 }), {});

  emotions1.forEach((v) => (emotions1_keyObjects[v.emotion] = v.num));
  emotions2.forEach((v) => (emotions2_keyObjects[v.emotion] = v.num));

  return Object.keys(Emotion).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: {
        value1: emotions1_keyObjects[cur],
        value2: emotions2_keyObjects[cur],
        diff: emotions1_keyObjects[cur] - emotions2_keyObjects[cur],
      },
    }),
    {} as EK
  );
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
