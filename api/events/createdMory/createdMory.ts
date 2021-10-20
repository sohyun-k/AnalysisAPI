import { client } from "../../datasource/connection";
import { createMory } from "../../datasource/mory";
import { calcContinuousTrend } from "./helper/continuousTrend";

type Arguments = {
  id: string;
  userId: string;
  emotion: string;
  location: string;
  text: string;
  createdAt: Date;
};

export const createdMory = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const location = JSON.parse(args.location);

  // create mory
  await createMory(
    args.id,
    args.userId,
    args.emotion,
    location.coordinate[0],
    location.coordinate[1],
    args.text,
    args.createdAt
  );

  // continous trend 계산
  const mories = await calcContinuousTrend(args.userId);
  console.log(mories);

  // past trend 계산

  // animal type 계산

  return true;
};
