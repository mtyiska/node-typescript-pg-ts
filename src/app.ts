import http from "http";
import express from "express";

import session from"express-session";

import connectRedis from"connect-redis";
import { createClient } from"redis";
import passport from"passport";
import dotenv from "dotenv"
dotenv.config()

// import {userRoutes, authRoutes} from'./services';
import { passportConfig } from"./utils/passport";

const router = express();

//Redis configurations
const redisClient = createClient({ 
  legacyMode: true,
});
redisClient.connect().catch(console.error);
const RedisStore = connectRedis(session);

//Configure session middleware
const SESSION_SECRET = process.env.SESSION_SECRET;


// session Middleware
router.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET! ,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,  // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in milliseconds
    },
  })
);
// after express session because passports rides on top
router.use(passport.initialize());
router.use(passport.session());

passportConfig();

import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import servicesRoutes from "./services";



process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});



// Disable users to see we use express
router.disable('x-powered-by');

applyMiddleware(middleware, router);
applyRoutes(servicesRoutes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000 } = process.env;
const server = http.createServer(router);
server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);
