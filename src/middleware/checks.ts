import { Request, Response, NextFunction } from "express";
import { HTTP400Error, HTTP401Error } from "../utils/httpErrors";

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const isAuth = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  if (!req.isAuthenticated()) {
    throw new HTTP401Error("Not Authenticated");
  } else {
    next();
  }
};
