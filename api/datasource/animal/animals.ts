import { AnimalInfo } from "../../type";

export const getAnimalType = (
  emotions: string[]
): AnimalInfo & { key: string } => {
  const convertedEmotions = emotions.map((v) => convertEmotionTypes(v));

  if (
    convertedEmotions.length > 1 &&
    convertedEmotions[1] === convertedEmotions[0]
  ) {
    convertedEmotions.pop();
  }

  const key = convertedEmotions.sort().join("");

  return { ...animals[key], key: key };
};

const convertEmotionTypes = (emotion: string) => {
  switch (emotion) {
    case "regret":
      return "sad";
    case "scared":
      return "nervous";
    case "annoyed":
      return "angry";
    case "lethargic":
      return "gloomy";
    case "proud":
      return "happy";
    case "surprised":
      return "fun";
    case "excited":
      return "love";
    default:
      return emotion;
  }
};

type AnimalImages = {
  [key: string]: AnimalInfo;
};

export const animals: AnimalImages = {
  angry: {
    animal: "porcupine_angry",
    title_kr: "화난 고슴도치",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/porcupine_angry%403x.png",
  },
  angrycalm: {
    animal: "mouse_narcissism",
    title_kr: "자기애가 강한 생쥐",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/mouse_narcissism%403x.png",
  },
  angryfun: {
    animal: "bee_working",
    title_kr: "묵묵히 일하는 꿀벌",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/bee_working%403x.png",
  },
  angrygloomy: {
    animal: "porcupine_gloomy",
    title_kr: "우울한 고슴도치",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/porcupine_gloomy%403x.png",
  },
  angryhappy: {
    animal: "cat_weird",
    title_kr: "이상한 고양이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/cat_weird%403x.png",
  },
  angryjealous: {
    animal: "pufferfish_pessimism",
    title_kr: "염세주의 복어",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/pufferfish_pessimism%403x.png",
  },
  angrylove: {
    animal: "moth_enthusiastic",
    title_kr: "열정적인 나방",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/moth_enthusiastic%403x.png",
  },
  angrynervous: {
    animal: "zebra_eyeshifting",
    title_kr: "동공지진 얼룩말",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/zebra_eyeshifting%403x.png",
  },
  angrysad: {
    animal: "meerkat_emotional",
    title_kr: "감정적인 미어캣",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/meerkat_emotional%403x.png",
  },
  calm: {
    title_kr: "긍정적인 리트리버",
    animal: "goldenretriever_optimistic",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/goldenretriever_optimistic%403x.png",
  },
  calmfun: {
    animal: "goldenretriever_carefree",
    title_kr: "고민없는 리트리버",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/goldenretriever_carefree%403x.png",
  },
  calmgloomy: {
    animal: "alpaca_alone",
    title_kr: "혼자있기 싫은 알파카",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/alpaca_alone%403x.png",
  },
  calmhappy: {
    animal: "seal_enjoying",
    title_kr: "삶이 즐거운 물개",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/seal_enjoying%403x.png",
  },
  calmjealous: {
    animal: "cat_polarizing",
    title_kr: "호불호가 확실한 고양이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/cat_polarizing%403x.png",
  },
  calmlove: {
    animal: "redpanda_lovemissionary",
    title_kr: "사랑전도사 레서팬더",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/redpanda_lovemissionary%403x.png",
  },
  calmnervous: {
    animal: "monkey_circus",
    title_kr: "외줄타기 원숭이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/monkey_circus%403x.png",
  },
  calmsad: {
    animal: "tiger_humane",
    title_kr: "인간적인 호랑이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/tiger_humane%403x.png",
  },
  fun: {
    animal: "redpanda_fun",
    title_kr: "즐거운 레서팬더",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/redpanda_fun%403x.png",
  },
  fungloomy: {
    animal: "alpaca_alone",
    title_kr: "혼자있기 싫은 알파카",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/alpaca_alone%403x.png",
  },
  funhappy: {
    animal: "squarrel_flying",
    title_kr: "하늘을 나는 다람쥐",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/squarrel_flying%403x.png",
  },
  funjealous: {
    animal: "owl_romantic",
    title_kr: "낭만주의 부엉이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/owl_romantic%403x.png",
  },
  funlove: {
    animal: "koala_enlightened",
    title_kr: "깨달음을 얻은 코알라",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/koala_enlightened%403x.png",
  },
  funnervous: {
    animal: "duck_yolo",
    title_kr: "오늘을 즐기는 오리",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/duck_yolo%403x.png",
  },
  funsad: {
    animal: "chick_manic",
    title_kr: "조울증에 걸린 병아리",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/chick_manic%403x.png",
  },
  gloomy: {
    animal: "panda_gloomy",
    title_kr: "우울한 판다",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/panda_gloomy%403x.png",
  },
  gloomyhappy: {
    animal: "chick_manic",
    title_kr: "조울증에 걸린 병아리",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/chick_manic%403x.png",
  },
  gloomyjealous: {
    animal: "giraffe_lethargic",
    title_kr: "힘이 없는 기린",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/giraffe_lethargic%403x.png",
  },
  gloomylove: {
    animal: "peacock_moviestar",
    title_kr: "영화주인공 공작새",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/peacock_moviestar%403x.png",
  },
  gloomynervous: {
    animal: "ostrich_fragile",
    title_kr: "마음이 여린 타조",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/ostrich_fragile%403x.png",
  },
  gloomysad: {
    animal: "deer_hurt",
    title_kr: "상처받은 사슴",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/deer_hurt%403x.png",
  },
  happy: {
    animal: "dolphin_happy",
    title_kr: "행복한 돌고래",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/dolphin_happy%403x.png",
  },
  happyjealous: {
    animal: "owl_romantic",
    title_kr: "낭만주의 부엉이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/owl_romantic%403x.png",
  },
  happylove: {
    animal: "alpaca_excited",
    title_kr: "두근두근 설레는 알파카",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/alpaca_excited%403x.png",
  },
  happynervous: {
    animal: "seal_worried",
    title_kr: "걱정스러운 물개",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/seal_worried%403x.png",
  },
  happysad: {
    animal: "meerkat_emotional",
    title_kr: "감정적인 미어캣",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/meerkat_emotional%403x.png",
  },
  jealous: {
    animal: "squarrel_sensitive",
    title_kr: "예민한 다람쥐",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/squarrel_sensitive%403x.png",
  },
  jealouslove: {
    animal: "porcupine_angry",
    title_kr: "화난 고슴도치",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/porcupine_angry%403x.png",
  },
  jealousnervous: {
    animal: "cat_polarizing",
    title_kr: "호불호가 확실한 고양이",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/cat_polarizing%403x.png",
  },
  jealoussad: {
    animal: "deer_hurt",
    title_kr: "상처받은 사슴",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/deer_hurt%403x.png",
  },
  love: {
    animal: "penguin_love",
    title_kr: "사랑이 넘치는 펭귄",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/penguin_love%403x.png",
  },
  lovenervous: {
    animal: "starfish_dangerous",
    title_kr: "위험한 불가사리",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/starfish_dangerous%403x.png",
  },
  lovesad: {
    animal: "deer_romantist",
    title_kr: "로맨티스트 사슴",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/deer_romantist%403x.png",
  },
  nervous: {
    animal: "capibara_nervous",
    title_kr: "불안한 카피바라",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/capibara_nervous%403x.png",
  },
  nervoussad: {
    animal: "panda_lethargic",
    title_kr: "무기력한 판다",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/panda_lethargic%403x.png",
  },
  sad: {
    animal: "orangutan_sad",
    title_kr: "슬픈 오랑우탄",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/orangutan_sad%403x.png",
  },
  none: {
    animal: "no_match",
    title_kr: "미지의 동물",
    image:
      "https://momoryimagebucket134420-dev.s3.ap-northeast-2.amazonaws.com/Animals/animal_nomatch%403x.png",
  },
};
