import { createAnimal, getRecentAnimal } from "../../../datasource/animal";
import {
  getEmotionCountsInMonth,
  getItemsInTwoWeeks,
} from "../../../datasource/mory";
import { createTrend } from "../../../datasource/trend";
import { createUser, getUser, updatePastTrend } from "../../../datasource/user";
import moment from "moment";
import { animals, getAnimalType } from "../../../datasource/animal/animals";
import request from "request";
import {
  notificationEndPoint,
  pushAnimalType,
} from "../../../datasource/notification";

type MoryIdsGroupByEmotion = {
  [key: string]: string[];
};

type LastPastTrendEmotionIds = {
  [key: string]: string;
};

/**
 * 1) 최근 animal type 조회
 *
 * 2) 최근 animal type이 null or 일주일 이상 지났으면 새로 체크 및 업데이트
 *
 * 2-1) 만약 최근 한달간 momory 가 10개 이상이 아니면 continue
 *
 * 2-2) 최근 한달간 momory가 10개 이상이면 calc 시작.
 *
 *
 *
 * 2) 안지났으면 그대로
 */

export const calcAnimalType = async (userId) => {
  // 최근 animal 조회
  const animal = await getRecentAnimal(userId);
  console.log(animal);

  // 최근 animal type이 null or 일주일 이상 지났으면 새로 체크 및 업데이트
  if (
    !animal ||
    (animal && moment().diff(moment(animal.createdAt).toDate(), "days") > 7)
  ) {
    const emotionCounts = await getEmotionCountsInMonth(userId);
    console.log(emotionCounts);

    var total = 0;

    emotionCounts.forEach((v) => (total += Number(v.count)));
    console.log(total);

    if (total < 10) {
      return;
    }

    var selectedEmotions = [emotionCounts[0].emotion];

    if (
      emotionCounts.length > 1 &&
      (emotionCounts[0].count / total) * 100 -
        (emotionCounts[1].count / total) * 100 <=
        10
    ) {
      selectedEmotions.push(emotionCounts[1].emotion);
    }

    const animalType = getAnimalType(selectedEmotions);
    console.log(animalType);

    // create animal
    if (animal && animal.animal === animalType.animal) {
      return;
    }

    await createAnimal(
      userId,
      animalType.animal,
      animalType.key,
      selectedEmotions[0],
      selectedEmotions.length > 1 ? selectedEmotions[1] : ""
    );

    //TODO: notification
    pushAnimalType(userId, animalType.key);
  }
};
