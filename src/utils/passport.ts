const LocalStrategy = require("passport-local/lib").Strategy;
const passport = require("passport");
import type * as s from 'zapatos/schema';

import {getUserByEmail, getUserById} from "../services/users/UserController"
import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from "express";

LocalStrategy.Strategy

export const passportConfig = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email:string, password:string, done:any) => {
        console.log('Inside local strategy callback')
  
        const result = await getUserByEmail(email);
        if(!result[0]) return done(null, false, { message: "Invalid credentials.\n" });
        
        const user = result[0];
        console.log(user)
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }

        if(email !== user.email) {
          return done(null, false, { message: "Invalid credentials.\n" });
        }

        console.log('Local strategy returned true')
        return done(null, user)
        
      }
    )
  );

  // tell passport how to serialize the user
  passport.serializeUser((user:any, done:any) => {
    console.log('Inside serializeUser callback. User id is save to the session file store here')
    console.log("user in Serialize is", user)
    done(null, user.id);
  });

  passport.deserializeUser(async (id:string, done:any) => {
    const result = await getUserById(id)
    if(!result[0]) done(new Error("Error occurred"), false);
    const user = result[0];
    done(null, user);
  });
};

export const authenticate = (req:Request, res: Response, next: NextFunction) =>{
  passport.authenticate('local', (err:any, user:any, info:any) => {
    console.log('Inside passport.authenticate() callback');
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/api/v1/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      // return "success"
      return res.redirect('/api/v1/authrequired');
    })
  })(req, res, next);
}

module.exports = {
  passportConfig,
  authenticate
}
/**
 Before we get into the code, let’s talk about the authentication flow.
The user is going to POST their login information to the /login route
We need to do something with that data. This is where passport comes in. 
We can call passport.authenticate(‘login strategy’, 
  callback(err, user, info) ). 
This method takes 2 parameters. Our ‘login strategy’ which is ‘local’ 
in this case, since we will be authenticating with email and password 
(you can find a list of other login strategies using passport though. 
  These include Facebook, Twitter, etc.) and a callback function 
giving us access to the user object if authentication is successful 
and an error object if not.

passport.authenticate() will call our ‘local’ auth strategy, so we need 
to configure passport to use that strategy. We can configure passport 
with passport.use(new strategyClass). Here we tell passport how the 
local strategy can be used to authenticate the user.
Inside the strategyClass declaration, we will take in the data from our 
POST request, use that to find the matching user in the database and check t
hat the credentials match. If they do match, passport will add a login() 
method to our request object, and we return to our passport.authenticate() 
callback function. Inside the passport.authenticate() callback function, 
we now call the req.login() method. The req.login(user, callback()) 
method takes in the user object we just returned from our local strategy 
and calls passport.serializeUser(callback()). It takes that user object and 
1) saves the user id to the session file store 
2) saves the user id in the request object as request.session.passport and 
3) adds the user object to the request object as request.user. 
Now, on subsequent requests to authorized routes, we can retrieve the user 
object without requiring the user to login again 
(by getting the id from the session file store and using that to get the 
  user object from the database and adding it to our request object).

 * 
 */