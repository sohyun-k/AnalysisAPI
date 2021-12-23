import moment from "moment";
import {
  getAllEmotionCountsInWeek,
  getAllMoryCountsInWeek,
  getAllUserCountsInWeek,
  getAllUserRanksInWeek,
  getUserEmotionCountsInWeek,
  getUserMoryCountsGroupByDateInWeek,
  getUserMorysInWeek,
} from "../../datasource/mory";
import { Emotion } from "../../type";

enum Gender {
  male,
  female,
}

type EmotionCount = {
  emotion: string;
  count: number;
};

type ChangeResult = {
  current: number;
  previous: number;
  text: string;
};

type ClusterComparisonResult = {
  sample: number;
  population: number;
  text: string;
};

type SentimentGroupChange = {
  positive: ChangeResult;
  negative: ChangeResult;
  neutral: ChangeResult;
};

type EmotionChange = {
  emotion: string;
  chnage: ChangeResult;
};

type UserSentimentAnalysis = {
  sentimentGroupChange: SentimentGroupChange;
  theBiggestEmotionChange: [EmotionChange];
};

type UserClusterAnalysis = {
  hasUserCluster: Boolean;
  userBirthYear: number;
  userAge: number;
  userGender: Gender;
  positive: ClusterComparisonResult;
  negatvie: ClusterComparisonResult;
  neutral: ClusterComparisonResult;
};

type EmotionGeoPonumber = {
  emotion: Emotion;
  latitude: number;
  longitude: number;
};

type GeoClusterCenter = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

type GeoClusterAnalysis = {
  geoHeatmapSources: [EmotionGeoPonumber];
  geoClusterCenters: [GeoClusterCenter];
};

type WeeklyStatistic = {
  // 해당 week에 작성한 mory의 전체 개수
  totalCount: number;
  // 해당 week에 작성한 mory의 감정별 개수
  thisWeekEmotionCount: EmotionCount[];
  // 이전 week에 작성한 mory의 감정별 개수
  previousWeekEmotionCount: EmotionCount[];
  // 해당 week의 순위 (%)
  rankPercent: number;
  // weekly의 경우 숫자가 담긴 7개의 배열
  gridHeatmapSources: number[];
};

type WeeklyReport = {
  weeklyStatistic: WeeklyStatistic;
  userSentimentAnalysis: UserSentimentAnalysis;
  userClusterAnalysis: UserClusterAnalysis;
  geoClusterAnalysis: GeoClusterAnalysis;
  mories: any;
};

type Arguments = {
  userId: string;
  year: number;
  weekNumber: number;
};

export const getWeeklyReport = async (event, context, callback) => {
  var args = event.arguments as Arguments;
  var result: WeeklyReport;

  const year = 2021;
  const weekNumber = 47;
  const userId = "UWeGwb8aC2WgBNyRoC3v0N3IHy73";

  // 1주 감정별 개수 조회
  const emotionCounts = await getAllEmotionCountsInWeek(year, weekNumber);

  // 1주 사용자 수 조회
  const userCounts = await getAllUserCountsInWeek(year, weekNumber);
  console.log(userCounts);

  // 1주 전체 mory 개수 조회
  const moryCounts = await getAllMoryCountsInWeek(year, weekNumber);
  console.log(moryCounts);

  // 1주 전체 user rank objects
  const userRanks = await getAllUserRanksInWeek(year, weekNumber);
  console.log(userRanks);

  // Loop 시작
  // 현재는 Test 계정만 사용

  // 이번주 사용자 감정별 개수 조회
  const userEmotionCounts = await getUserEmotionCountsInWeek(
    year,
    weekNumber,
    userId
  );

  // 지난주 사용자 감정별 개수 조회
  const previousWeekNumber = moment()
    .year(year)
    .isoWeek(weekNumber)
    .subtract(7, "d")
    .isoWeek();
  const previousWeekYear = moment()
    .year(year)
    .isoWeek(weekNumber)
    .subtract(7, "d")
    .year();

  const previousUserEmotionCounts = await getUserEmotionCountsInWeek(
    previousWeekYear,
    previousWeekNumber,
    userId
  );

  // 감정 개수 RANK Percentage
  const rankPercentage = (userRanks[userId] / userCounts) * 100;
  console.log(rankPercentage);

  // 기록한 날 계산
  const createdDates = await getUserMoryCountsGroupByDateInWeek(
    year,
    weekNumber,
    userId
  );
  console.log(createdDates.forEach((v) => console.log(v)));

  // 감정 위치 클러스터링 계산
  const userMories = await getUserMorysInWeek(year, weekNumber, userId);
  userMories.forEach((v) => console.log(v.latitude, v.longitude));

  // 사용자 클러스터링 계산

  result = {
    weeklyStatistic: {
      totalCount: userMories.length,
      thisWeekEmotionCount: userEmotionCounts,
      previousWeekEmotionCount: previousUserEmotionCounts,
      rankPercent: rankPercentage,
      gridHeatmapSources: createdDates.map((v) => v.count),
    },
  };

  callback(null, result);
};
