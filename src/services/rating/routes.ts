import { Request, Response } from "express";

import {
  getMultipleRatings,
  getRateById,
  createRate,
  updateRate,
  deleteRate,
  updateRateType,
  createRateType
  } from './RatingController';
// import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/ratings",
    method: "get",
    handler: [
      async ({query}: Request, res: Response) => {
        const result = await getMultipleRatings();
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/ratings/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await getRateById(req.params.id);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/ratings",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await createRate(req.body as createRateType);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/ratings/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const result = await updateRate(req.params.id, req.body as updateRateType);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/ratings/:id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const result = await deleteRate(req.params.id);
        res.status(200).send(result);
      }
    ]
  }
];
