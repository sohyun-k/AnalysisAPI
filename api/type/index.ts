export type Mory = {
  id: string;
  userId: string;
  emotion: string;
  latitude: number;
  longitude: number;
  content: string;
  createdAt: Date;
};

export type MoryId = {
  id: string;
  userId: string;
};

type KeyString = {
  [key: string]: string;
};

export type User = {
  id: string;
  lastContinuousTrendEmotion?: string;
  lastContinuousTrendId?: number;
  lastContinuousTrendCount: number;
  lastPastTrendEmotionIds?: KeyString;
};

export type Trend = {
  id: number;
  userId: string;
  type: string;
  emotion: string;
  date: Date;
  moryIds: string[];
};

export type Animal = {
  id: number;
  userId: string;
  key: string;
  animal: string;
  emotion1: string;
  emotion2: string;
  createdAt: Date;
};

export type AnimalInfo = {
  animal: string;
  title_kr: string;
  image: string;
};

export enum Emotion {
  angry = "angry",
  annoyed = "annoyed",
  calm = "calm",
  excited = "excited",
  fun = "fun",
  gloomy = "gloomy",
  happy = "happy",
  jealous = "jealous",
  lethargic = "lethargic",
  love = "love",
  nervous = "nervous",
  proud = "proud",
  regret = "regret",
  sad = "sad",
  scared = "scared",
  surprised = "surprised",
}

export type MoryDateCount = {
  date: string;
  count: number;
};

export type UserRanks = {
  [key: string]: number;
};

export enum Gender {
  male,
  female,
}

export type EmotionCount = {
  emotion: string;
  num: number;
};

export type ChangeResult = {
  current: number;
  previous: number;
  text: string;
};

export type ClusterComparisonResult = {
  sample: number;
  population: number;
  text: string;
};

export type SentimentGroupChange = {
  positive: ChangeResult;
  negative: ChangeResult;
  neutral: ChangeResult;
};

export type EmotionChange = {
  emotion: string;
  change: ChangeResult;
};

export type UserSentimentAnalysis = {
  sentimentGroupChange: SentimentGroupChange;
  theBiggestEmotionChange: EmotionChange[];
};

export type UserClusterAnalysis = {
  hasUserCluster: Boolean;
  userBirthYear: number;
  userAge: number;
  userGender: Gender;
  positive: ClusterComparisonResult;
  negatvie: ClusterComparisonResult;
  neutral: ClusterComparisonResult;
};

export type EmotionGeoPonumber = {
  emotion: Emotion;
  latitude: number;
  longitude: number;
};

export type GeoClusterCenter = {
  name?: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type GeoClusterAnalysis = {
  geoHeatmapSources: EmotionGeoPonumber[];
  geoClusterCenters: GeoClusterCenter[];
};

export type GridHeatmapSources = {
  text: String;
  data: number[];
};

export type GridHeatmapEmotionSources = {
  text: String;
  data: Emotion[][];
};

export type WeeklyStatistic = {
  // ?????? week??? ????????? mory??? ?????? ??????
  totalCount: number;
  // ?????? week??? ????????? mory??? ????????? ??????
  thisWeekEmotionCount: EmotionCount[];
  // ?????? week??? ????????? mory??? ????????? ??????
  previousWeekEmotionCount: EmotionCount[];
  // ?????? week??? ?????? (%)
  rankPercent: number;

  gridHeatmapSources: GridHeatmapSources;

  gridHeatmapEmotionSources: GridHeatmapEmotionSources;

  mostCreatedEmotion: Emotion;
};

export type WeeklyReport = {
  year: number;
  month: number;
  weekNumber: number;
  weeklyStartDate: Date;
  weeklyEndDate: Date;
  weeklyStatistic: WeeklyStatistic;
  userSentimentAnalysis: UserSentimentAnalysis;
  userClusterAnalysis: UserClusterAnalysis;
  geoClusterAnalysis: GeoClusterAnalysis;
  mories: any;
};

export type MonthlyStatistic = {
  // ?????? week??? ????????? mory??? ?????? ??????
  totalCount: number;
  // ?????? week??? ????????? mory??? ????????? ??????
  thisMonthEmotionCount: EmotionCount[];
  // ?????? week??? ????????? mory??? ????????? ??????
  previousMonthEmotionCount: EmotionCount[];
  // ?????? week??? ?????? (%)
  rankPercent: number;

  gridHeatmapSources: GridHeatmapSources;

  gridHeatmapEmotionSources: GridHeatmapEmotionSources;

  mostCreatedEmotion: Emotion;
};

export type MonthlyReport = {
  year: number;
  month: number;
  monthlyStatistic: MonthlyStatistic;
  userSentimentAnalysis: UserSentimentAnalysis;
  userClusterAnalysis: UserClusterAnalysis;
  geoClusterAnalysis: GeoClusterAnalysis;
  mories: any;
};

export enum AnalysisReportType {
  Weekly,
  Monthly,
}
