import moment from "moment";
import { AnalysisReportType, Gender, UserClusterAnalysis } from "../../type";

type Arguments = {
  userId: string;
  gender: Gender;
  age: number;
  reportType: AnalysisReportType;
};

export const createUserClusterInfo = async (event, context, callback) => {
  var args = event.arguments as Arguments;
  var result: UserClusterAnalysis;

  //TODO: age 가 잘못되었을 경우

  result = {
    hasUserCluster: true,
    userAge: args.age,
    userBirthYear: getBirthYear(args.age),
    userGender: args.gender,
    positive: {
      population: 12.3,
      sample: 8.4,
      text: `${Math.round(((8.4 - 12.3) / 12.3) * 100)}%`,
    },
    negatvie: {
      population: 16.3,
      sample: 20.2,
      text: `${Math.round(((16.3 - 20.2) / 16.3) * 100)}%`,
    },
    neutral: {
      population: 8.3,
      sample: 8.4,
      text: `${Math.round(((8.4 - 8.3) / 8.3) * 100)}%`,
    },
  };

  callback(null, result);
};

const getBirthYear = (age: number) => {
  const thisYear = moment().year();
  return thisYear - age + 1;
};
