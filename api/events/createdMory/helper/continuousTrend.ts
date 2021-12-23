import { getRecentItems } from "../../../datasource/mory";
import { pushContinuousTrend } from "../../../datasource/notification";
import { createTrend, getTrend } from "../../../datasource/trend";
import {
  createUser,
  getUser,
  updateContinuousTrend,
} from "../../../datasource/user";
import { Mory } from "../../../type";

export const calcContinuousTrend = async (userId) => {
  var user = await getUser(userId);

  //TODO: 나중에 지울 것.
  if (!user) {
    await createUser(userId);
    user = await getUser(userId);
  }

  /**
   * 1) fetch last continous trend cache
   * lastContinuousTrendCount - 0
   * lastContinuousTrendEmotion - null
   *
   * 2) if the current emotion is same as the cache one,
   * lastContinousTrendCount += 1
   *  2-1) if lastContinousTrendCount === 3
   *  - createTrend
   *  - updateLastContinuousTrendId
   *  - updateLastContinuousTrend Count = 0
   *  - send notification
   *
   * 2) if the current emotion is dfferent from the cache one,
   * lastContinousTrendCount = 1
   * lastContinuousTrendEmotion = currentEmotion
   *
   */

  const mories: Mory[] = await getRecentItems(userId);

  // 가장 최신 emotion
  const lastEmotion = mories[0].emotion;
  // emotion 의 개수가 3개인지 점검
  if (mories.length !== 3) {
    if (mories.length === 2) {
      if (user.lastContinuousTrendEmotion === lastEmotion) {
        await updateContinuousTrend(
          lastEmotion,
          null,
          user.lastContinuousTrendCount + 1,
          userId
        );
        return;
      }
    }

    await updateContinuousTrend(lastEmotion, null, 1, userId);
    return;
  }

  // emotion 이 같은 경우
  if (
    user.lastContinuousTrendEmotion &&
    user.lastContinuousTrendEmotion === lastEmotion
  ) {
    if (user.lastContinuousTrendCount === 2) {
      // 새로운 trend 발행
      const newTrendId = await createTrend(
        userId,
        "continuous",
        lastEmotion,
        new Date(),
        mories.map((v) => v.id)
      );

      pushContinuousTrend(
        userId,
        newTrendId,
        lastEmotion,
        new Date(),
        mories.map((v) => v.id)
      );

      // update
      await updateContinuousTrend(null, newTrendId, 0, userId);

      //TODO: send notification
    } else {
      // update
      await updateContinuousTrend(
        lastEmotion,
        null,
        user.lastContinuousTrendCount + 1,
        userId
      );
    }
  } else {
    // emotion 이 다른 경우
    await updateContinuousTrend(lastEmotion, null, 1, userId);
  }
};
