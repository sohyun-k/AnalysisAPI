import moment from "moment";
import {
  getAllEmotionCountsInWeek,
  getAllMoryCountsInWeek,
  getAllUserCountsInWeek,
  getAllUserRanksInWeek,
  getUserEmotionCountsGroupByDateInWeek,
  getUserEmotionCountsInWeek,
  getUserMoryCountsGroupByDateInWeek,
  getUserMorysInWeek,
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
  WeeklyReport,
  WeeklyStatistic,
} from "../../type";
import AWS from "aws-sdk";
import { MoryId } from "../../type";

AWS.config.update({ region: "ap-northeast-2" });
const dbclient = new AWS.DynamoDB();

type Arguments = {
  userId: string;
  year: number;
  weekNumber: number;
};

export const getWeeklyReport = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const result = await _getWeeklyReport(args);

  callback(null, result);
};

export const _getWeeklyReport = async (args: Arguments): Promise<WeeklyReport> => {
  var result: WeeklyReport;

  const year = args.year;
  const weekNumber = args.weekNumber;
  const userId = args.userId;

  const { weeklyStartDate, weeklyEndDate, month } = getThisWeekInfo(year, weekNumber);
  const { emotionCounts, userCounts, userRanks, moryCounts } = await getTotalWeeklyData(year, weekNumber);
  const { previousWeekEmotionCount, thisWeekEmotionCount, userMories, createdDates, createdDatesWithEmotions } = await getUserWeeklyData(
    year,
    weekNumber,
    userId
  );

  if (previousWeekEmotionCount.length === 0 && thisWeekEmotionCount.length === 0) {
    return result;
  }

  // 사용자 클러스터링 계산
  result = {
    year,
    month,
    weekNumber,
    weeklyStartDate,
    weeklyEndDate,
    weeklyStatistic: await getWeeklyStatistic(
      thisWeekEmotionCount,
      previousWeekEmotionCount,
      createdDates,
      createdDatesWithEmotions,
      userCounts,
      userRanks,
      userId
    ),
    userSentimentAnalysis: getUserSentimentAnalysis(previousWeekEmotionCount, thisWeekEmotionCount),
    userClusterAnalysis: getUserClusterAnalysis(),
    geoClusterAnalysis: getGeoClusterAnalysis(userMories),
    mories: await getMories(userMories.map((v) => ({ id: v.id, userId: v.userId }))),
  };

  return result;
};

const getThisWeekInfo = (year: number, weekNumber: number) => {
  const month = getMonthFromWeekNumber(year, weekNumber);
  const weeklyStartDate = getWeeklyStartDate(year, weekNumber);
  const weeklyEndDate = getWeeklyEndDate(year, weekNumber);

  return { month, weeklyStartDate, weeklyEndDate };
};

const getTotalWeeklyData = async (year: number, weekNumber: number) => {
  // 1주 감정별 개수 조회
  const emotionCounts = await getAllEmotionCountsInWeek(year, weekNumber);

  // 1주 사용자 수 조회
  const userCounts = await getAllUserCountsInWeek(year, weekNumber);

  // 1주 전체 mory 개수 조회
  const moryCounts = await getAllMoryCountsInWeek(year, weekNumber);

  // 1주 전체 user rank objects
  const userRanks = await getAllUserRanksInWeek(year, weekNumber);

  return {
    emotionCounts,
    userCounts,
    moryCounts,
    userRanks,
  };
};

const getUserWeeklyData = async (year: number, weekNumber: number, userId: string) => {
  const { previousWeekYear, previousWeekNumber } = getPreviousWeekNumber(year, weekNumber);

  const thisWeekEmotionCount = await getUserEmotionCountsInWeek(year, weekNumber, userId);

  const previousWeekEmotionCount = await getUserEmotionCountsInWeek(previousWeekYear, previousWeekNumber, userId);

  const createdDates = await getUserMoryCountsGroupByDateInWeek(year, weekNumber, userId);

  const createdDatesWithEmotions = await getUserEmotionCountsGroupByDateInWeek(year, weekNumber, userId);

  const userMories = await getUserMorysInWeek(year, weekNumber, userId);

  return {
    previousWeekEmotionCount,
    thisWeekEmotionCount,
    createdDates,
    createdDatesWithEmotions,
    userMories,
  };
};

const getWeeklyStatistic = async (
  thisWeekEmotionCount: EmotionCount[],
  previousWeekEmotionCount: EmotionCount[],
  createdDates: MoryDateCount[],
  createdDatesWithEmotions: Emotion[][],
  userCounts: number,
  userRanks: UserRanks,
  userId: string
): Promise<WeeklyStatistic> => {
  const rankPercentage = userId in userRanks ? (userRanks[userId] / userCounts) * 100 : 100.0;

  const getGridHeatmapSources = (): GridHeatmapSources => {
    const total = createdDates.length;
    const days = createdDates.reduce((acc, cur) => (cur.count > 0 ? acc + 1 : acc), 0);

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
    if (thisWeekEmotionCount.length) {
      var maxVal = 0;
      var emo = null;

      thisWeekEmotionCount.forEach((v) => {
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
    totalCount: thisWeekEmotionCount.reduce((acc, cur) => acc + cur.num, 0),
    thisWeekEmotionCount,
    previousWeekEmotionCount,
    rankPercent: rankPercentage,
    gridHeatmapSources: getGridHeatmapSources(),
    gridHeatmapEmotionSources: getGridHeatmapEmotionSources(),
    mostCreatedEmotion: getMostCreatedEmotion(),
  };
};

const getUserSentimentAnalysis = (previousWeekEmotionCount: EmotionCount[], thisWeekEmotionCount: EmotionCount[]): UserSentimentAnalysis => {
  const previousWeek = setimentCountReducer(previousWeekEmotionCount);
  const thisWeek = setimentCountReducer(thisWeekEmotionCount);

  const getSentimentGroupChange = (group: "positive" | "negative" | "neutral"): ChangeResult => {
    const pre = previousWeek[group];
    const cur = thisWeek[group];
    var text = "";

    if (pre > 0 && cur > 0) {
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
      previous: previousWeek[group],
      current: thisWeek[group],
      text,
    };
  };

  const getBiggestEmotionChange = (): EmotionChange[] => {
    const emotionChanges = compareEmotionChange(thisWeekEmotionCount, previousWeekEmotionCount);
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

const getPreviousWeekNumber = (year: number, weekNumber: number) => {
  const previousWeekNumber = moment().year(year).isoWeek(weekNumber).subtract(7, "d").isoWeek();
  const previousWeekYear = moment().year(year).isoWeek(weekNumber).subtract(7, "d").year();

  return { previousWeekNumber, previousWeekYear };
};

const getWeeklyStartDate = (year: number, weekNumber: number) => {
  return moment().year(year).isoWeek(weekNumber).day(0).toDate();
};

const getWeeklyEndDate = (year: number, weekNumber: number) => {
  return moment().year(year).isoWeek(weekNumber).day(6).toDate();
};

const getMonthFromWeekNumber = (year: number, weekNumber: number) => {
  return moment().year(year).isoWeek(weekNumber).month() + 1;
};

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
