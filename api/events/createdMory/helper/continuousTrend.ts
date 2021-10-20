import { getRecentItems } from "../../../datasource/mory";
import { createTrend, getTrend } from "../../../datasource/trend";
import {
  createUser,
  getUser,
  updateContinuousTrend,
} from "../../../datasource/user";
import { Mory } from "../../../type";

export const calcContinuousTrend = async (userId) => {
  const user = await getUser(userId);
  console.log("user", user);

  //TODO: 나중에 지울 것.
  if (user === undefined) {
    await createUser(userId);
  }

  const mories: Mory[] = await getRecentItems(userId);
  console.log("mories", mories.length);

  // emotion 의 개수가 3개인지 점검
  if (mories.length !== 3) {
    return;
  }

  // emotion 이 다 같은지 점검
  const _firstEmotion = mories[0].emotion;
  var hasAllSameEmotion = true;
  mories.forEach((v) => {
    if (v.emotion !== _firstEmotion) {
      hasAllSameEmotion = false;
    }
  });

  // 다른 emotion일 경우 user 상태 업데이트
  if (!hasAllSameEmotion) {
    await updateContinuousTrend(null, null, userId);
  }

  // 같은 emotion일 경우
  if (hasAllSameEmotion) {
    // last continuous trend emotion 이랑 현재 최근 emotion이 같은지 확인
    if (
      user.lastContinuousTrendEmotion &&
      user.lastContinuousTrendEmotion === _firstEmotion
    ) {
      return;
    } else {
      if (user.lastContinuousTrendId) {
        // lastContinuousTrendId로 조회 후, mory id가 겹치는 것이 있는지 확인
        const trend = await getTrend(user.lastContinuousTrendId);
        const _ = trend.moryIds.some((id) => id in mories);

        console.log("result", _);
        if (_) {
          return;
        }
      } else {
        // 새로운 trend 발행
        const _ = await createTrend(
          userId,
          "continuous",
          _firstEmotion,
          new Date(),
          mories.map((v) => v.id)
        );

        // await updateContinuousTrend(_firstEmotion, _, userId);

        // notification 전달
      }
    }
  }
};
