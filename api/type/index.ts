export type Mory = {
  id: string;
  userId: string;
  emotion: string;
  latitude: number;
  longitude: number;
  content: string;
  createdAt: Date;
};

export type User = {
  id: string;
  lastContinuousTrendEmotion?: string;
  lastContinuousTrendId?: number;
};

export type Trend = {
  id: number;
  userId: string;
  type: string;
  emotion: string;
  date: Date;
  moryIds: string[];
};
