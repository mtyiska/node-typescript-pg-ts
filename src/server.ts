// import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";

const app = express();
applyMiddleware(middleware, app);
applyRoutes(routes, app);

const { PORT = 3000 } = process.env;
// const server = http.createServer(app);
// server.listen(PORT, () =>
//   console.log(`Server is running http://localhost:${PORT}...`)
// );

app.listen(PORT, () =>{
    console.log(`Server is running http://localhost:${PORT}...`)
})