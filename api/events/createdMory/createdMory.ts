import { request } from "http";
import { client } from "../../datasource/connection";
import { createMory } from "../../datasource/mory";
import {
  notificationEndPoint,
  pushAnimalType,
} from "../../datasource/notification";
import { calcAnimalType } from "./helper/animalType";
import { calcContinuousTrend } from "./helper/continuousTrend";
import { calcPastTrend } from "./helper/pastTrend";

type Arguments = {
  id: string;
  userId: string;
  emotion: string;
  latitude: number;
  longitude: number;
  text: string;
  createdAt: Date;
};

export const createdMory = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  // create mory
  await createMory(
    args.id,
    args.userId,
    args.emotion,
    args.latitude,
    args.longitude,
    args.text,
    args.createdAt
  );

  // continous trend 계산
  await calcContinuousTrend(args.userId);

  // past trend 계산
  await calcPastTrend(args.userId);

  // animal type 계산
  await calcAnimalType(args.userId);

  return true;
};
