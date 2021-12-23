import { getRecentAnimal } from "../../datasource/animal";
import { animals } from "../../datasource/animal/animals";

type Arguments = {
  id: string;
  userId: string;
  emotion: string;
  location: string;
  text: string;
  createdAt: Date;
};

export const getUserAnimalType = async (event, context, callback) => {
  var args = event.arguments as Arguments;

  const animalType = await getRecentAnimal(args.userId);
  var result = null;

  if (animalType) {
    result = {
      name: animals[animalType.key].title_kr,
      image: animals[animalType.key].image,
    };
  }

  callback(null, result);
};
