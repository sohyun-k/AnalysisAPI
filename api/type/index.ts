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
  angry,
  annoyed,
  calm,
  excited,
  fun,
  gloomy,
  happy,
  jealous,
  lethargic,
  love,
  nervous,
  proud,
  regret,
  sad,
  scared,
  surprised,
}

export type MoryDateCount = {
  date: string;
  count: number;
};
