import { Request, Response } from "express";
import { getRandomJoke } from "./JokeController";

export default [
  {
    path: "/api/v1/jokes",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await getRandomJoke();
        res.status(200).send(result);
      }
    ]
  }
];