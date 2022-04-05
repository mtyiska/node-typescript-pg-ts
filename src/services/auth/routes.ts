import { NextFunction, Request, Response } from "express";
import {authenticate} from "../../utils/passport"
import { isAuth } from "../../middleware/checks";

export default [
    {
      path: "/api/v1/login/",
      method: "post",
      handler: [
        async (req: Request, res: Response, next: NextFunction) => {
          authenticate(req, res, next);
        //   console.log(result)
        //   return res.status(200).send("success");
        return "success"
        }
      ]
    },
    {
      path: "/api/v1/logout/",
      method: "post",
      handler: [
        async (req: Request, res: Response, next: NextFunction) => {
            req.logout();
            req.session.destroy(function (err) {
              if (err) { return next(err); }
              res.clearCookie('connect.sid');
              // The response should indicate that the user is no longer authenticated.
              return res.status(200).send({ authenticated: req.isAuthenticated() });
            });
        }
      ]
    },
    {
        path: "/api/v1/authrequired/",
        method: "get",
        handler: [
            isAuth,
          async (req: Request, res: Response, next: NextFunction) => {
            console.log('Inside GET /authrequired callback')
            console.log(`User authenticated? ${req.isAuthenticated()}`)
            res.status(200).send('you hit the authentication endpoint\n')
          }
        ]
      },

  ];