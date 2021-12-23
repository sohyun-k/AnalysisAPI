import { deleteMory } from "../../datasource/mory";
import {
  createUser,
  getUser,
  updateContinuousTrend,
} from "../../datasource/user";

type Arguments = {
  id: string;
  userId: string;
  emotion: string;
  latitude: number;
  longitude: number;
  text: string;
  createdAt: Date;
};

export const deletedMory = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  // delete mory
  await deleteMory(args.id);

  // continuous trend -1
  var user = await getUser(args.userId);

  //TODO: 나중에 지울 것.
  if (!user) {
    await createUser(args.userId);
    user = await getUser(args.userId);
  }

  if (user.lastContinuousTrendCount <= 1) {
    await updateContinuousTrend(null, null, 0, args.userId);
  } else {
    await updateContinuousTrend(
      user.lastContinuousTrendEmotion,
      null,
      user.lastContinuousTrendCount - 1,
      args.userId
    );
  }

  return true;
};
