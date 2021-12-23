import { getItemsInTwoWeeks } from "../../../datasource/mory";
import { pushPastTrend } from "../../../datasource/notification";
import { createTrend } from "../../../datasource/trend";
import { createUser, getUser, updatePastTrend } from "../../../datasource/user";

type MoryIdsGroupByEmotion = {
  [key: string]: string[];
};

type LastPastTrendEmotionIds = {
  [key: string]: string;
};

export const calcPastTrend = async (userId) => {
  var user = await getUser(userId);

  //TODO: 나중에 지울 것.
  if (!user) {
    await createUser(userId);
    user = await getUser(userId);
  }

  // past trend data json
  var lastPastTrendEmotionIds: LastPastTrendEmotionIds = {};
  if (user.lastPastTrendEmotionIds) {
    lastPastTrendEmotionIds = user.lastPastTrendEmotionIds;
  }

  // fetch last mories in 2 weeks
  const mories = await getItemsInTwoWeeks(userId);
  var moryIdsGroupByEmotion: MoryIdsGroupByEmotion = {};

  mories.forEach((v) => {
    if (v.emotion in moryIdsGroupByEmotion) {
      moryIdsGroupByEmotion[v.emotion].push(v.id);
    } else {
      moryIdsGroupByEmotion[v.emotion] = [v.id];
    }
  });

  async function createAndUpdatePastTrend(emotion) {
    if (
      emotion in lastPastTrendEmotionIds &&
      moryIdsGroupByEmotion[emotion].includes(lastPastTrendEmotionIds[emotion])
    ) {
      return;
    }
    // 새로운 trend 발행
    const newTrendId = await createTrend(
      userId,
      "past",
      emotion,
      new Date(),
      moryIdsGroupByEmotion[emotion].map((id) => id)
    );
    lastPastTrendEmotionIds[emotion] = moryIdsGroupByEmotion[emotion][0];

    // update
    await updatePastTrend(JSON.stringify(lastPastTrendEmotionIds), userId);

    //TODO: notification
    pushPastTrend(
      userId,
      newTrendId,
      emotion,
      new Date(),
      moryIdsGroupByEmotion[emotion].map((id) => id)
    );
  }

  const pastTrendFuncs = Object.keys(moryIdsGroupByEmotion)
    .filter((emotion) => moryIdsGroupByEmotion[emotion].length >= 20)
    .map((emotion) => createAndUpdatePastTrend(emotion));

  await Promise.all(pastTrendFuncs);
};
