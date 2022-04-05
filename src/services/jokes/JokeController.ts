import { getJokes } from "./providers/JokeProvider";

export const getRandomJoke = async () => {
  return await getJokes();
};