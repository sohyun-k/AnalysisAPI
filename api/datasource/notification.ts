import aws from "aws-sdk";
import { animals } from "./animal/animals";
import { continuousTrend, pastTrend } from "./trend/trends";

const lambda = new aws.Lambda({ region: "ap-northeast-2" });

export const notificationEndPoint =
  "https://v9wcekhit8.execute-api.ap-northeast-2.amazonaws.com/default/NotificationAPI";

export const pushAnimalType = (userId, animalKey) => {
  const event = {
    type: "animal",
    userId,
    animalTitle: animals[animalKey].title_kr,
    animalImage: animals[animalKey].image,
  };

  lambda.invoke(
    {
      FunctionName: "NotificationAPI",
      InvocationType: "Event",
      Payload: JSON.stringify(event, null, 2),
    },
    function (error, data) {
      if (error) {
        console.info(error);
      } else {
        console.info(data);
      }
    }
  );
};

export const pushContinuousTrend = (
  userId,
  trendId,
  emotion,
  date,
  moryIds
) => {
  const _ = continuousTrend[emotion];

  const event = {
    type: "continuousTrend",
    userId,
    emotion,
    trendId,
    date,
    moryIds,
    title: _.title,
    caption: _.caption,
    content: _.content,
  };

  lambda.invoke(
    {
      FunctionName: "NotificationAPI",
      InvocationType: "Event",
      Payload: JSON.stringify(event, null, 2),
    },
    function (error, data) {
      if (error) {
        console.info(error);
      }
      if (data) {
        console.info(data);
      }
    }
  );
};

export const pushPastTrend = (userId, trendId, emotion, date, moryIds) => {
  const _ = pastTrend[emotion];

  const event = {
    type: "pastTrend",
    userId,
    emotion,
    trendId,
    date,
    moryIds,
    title: _.title,
    caption: _.caption,
    content: _.content,
  };

  lambda.invoke(
    {
      FunctionName: "NotificationAPI",
      InvocationType: "Event",
      Payload: JSON.stringify(event, null, 2),
    },
    function (error, data) {
      if (error) {
        console.info(error);
      }
    }
  );
};
