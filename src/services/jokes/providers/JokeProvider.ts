import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

export const getJokes = async () => {
  const url = 'https://v2.jokeapi.dev/joke/Any';
  const response = await axios.get(url);

  return response.data;
};