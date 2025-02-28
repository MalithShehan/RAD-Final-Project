import express from "express";
import jwt, {Secret} from "jsonwebtoken";
import {User} from "../model/user";
import {verifyUserCredentials} from "../databse/user-client";

const router = express.Router();

// Dummy login route
router.post("/login", async (req, res) => {
    console.log('Login')
    const username = req.body.user.username;
    const password = req.body.user.password;

    const user : User = {username, password};

    try{
        const isVerified =  await verifyUserCredentials(user);

        if(isVerified){
            const token = jwt.sign({ username }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
            const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
            res.json({accessToken : token, refreshToken : refreshToken});
        }else{
            res.sendStatus(403).send('Invalid credentials')
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

// Middleware to authenticate JWT token
export function authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    console.log(token);
    if(!token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, iat: number};
        console.log(payload.username);
        req.body.username = payload.username;
        next();
    }catch(err){
        res.status(401).send(err);
    }
}

export default router;
