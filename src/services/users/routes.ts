import { Request, Response } from "express";

import {
createUser,
deleteUser,
getMultipleUsers,
getUserById,
updateUser,
createUserType
  } from './UserController';
// import { checkSearchParams } from "../../middleware/checks";

export default [
  {
    path: "/api/v1/users",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await getMultipleUsers();
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/users/:id",
    method: "get",
    handler: [
      async (req: Request, res: Response) => {
        const result = await getUserById(req.params.id);
        res.status(200).send(result);
      }
    ]
  },
  
  {
    path: "/api/v1/users",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {
        const result = await createUser(req.body as createUserType);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/users/:id",
    method: "put",
    handler: [
      async (req: Request, res: Response) => {
        const result = await updateUser(req.params.id, req.body as createUserType);
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/users/:id",
    method: "delete",
    handler: [
      async (req: Request, res: Response) => {
        const result = await deleteUser(req.params.id);
        res.status(200).send(result);
      }
    ]
  }
];
