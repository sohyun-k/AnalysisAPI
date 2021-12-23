"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.pushPastTrend = exports.pushContinuousTrend = exports.pushAnimalType = exports.notificationEndPoint = void 0;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var animals_1 = require("./animal/animals");
var trends_1 = require("./trend/trends");
var lambda = new aws_sdk_1["default"].Lambda({ region: "ap-northeast-2" });
exports.notificationEndPoint = "https://v9wcekhit8.execute-api.ap-northeast-2.amazonaws.com/default/NotificationAPI";
var pushAnimalType = function (userId, animalKey) {
    var event = {
        type: "animal",
        userId: userId,
        animalTitle: animals_1.animals[animalKey].title_kr,
        animalImage: animals_1.animals[animalKey].image
    };
    lambda.invoke({
        FunctionName: "NotificationAPI",
        InvocationType: "Event",
        Payload: JSON.stringify(event, null, 2)
    }, function (error, data) {
        if (error) {
            console.info(error);
        }
        else {
            console.info(data);
        }
    });
};
exports.pushAnimalType = pushAnimalType;
var pushContinuousTrend = function (userId, trendId, emotion, date, moryIds) {
    var _ = trends_1.continuousTrend[emotion];
    var event = {
        type: "continuousTrend",
        userId: userId,
        emotion: emotion,
        trendId: trendId,
        date: date,
        moryIds: moryIds,
        title: _.title,
        caption: _.caption,
        content: _.content
    };
    lambda.invoke({
        FunctionName: "NotificationAPI",
        InvocationType: "Event",
        Payload: JSON.stringify(event, null, 2)
    }, function (error, data) {
        if (error) {
            console.info(error);
        }
        if (data) {
            console.info(data);
        }
    });
};
exports.pushContinuousTrend = pushContinuousTrend;
var pushPastTrend = function (userId, trendId, emotion, date, moryIds) {
    var _ = trends_1.pastTrend[emotion];
    var event = {
        type: "pastTrend",
        userId: userId,
        emotion: emotion,
        trendId: trendId,
        date: date,
        moryIds: moryIds,
        title: _.title,
        caption: _.caption,
        content: _.content
    };
    lambda.invoke({
        FunctionName: "NotificationAPI",
        InvocationType: "Event",
        Payload: JSON.stringify(event, null, 2)
    }, function (error, data) {
        if (error) {
            console.info(error);
        }
    });
};
exports.pushPastTrend = pushPastTrend;
//# sourceMappingURL=notification.js.map