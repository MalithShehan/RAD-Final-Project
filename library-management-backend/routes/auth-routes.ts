import express, {Request, Response, NextFunction} from "express";
import jwt, { Secret } from "jsonwebtoken";
import { createUser, verifyUserCredentials } from "../database/data-store";
import { User } from "../models/User";

const router = express.Router();

// POST: Login

// @ts-ignore
router.post("/login", async (req, res) => {
    const { username, password } = req.body.user;
    const user: User = { username, password };

    try {
        const isVerified = await verifyUserCredentials(user);

        if (isVerified) {
            const accessToken = jwt.sign(
                { username },
                process.env.SECRET_KEY as Secret,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                { username },
                process.env.REFRESH_TOKEN as Secret,
                { expiresIn: "7d" }
            );

            return res.json({ accessToken, refreshToken });
        } else {
            return res.status(403).send("Invalid credentials");
        }
    } catch (err) {
        console.error("Login error:", err);
        return res.status(400).send("Error during login");
    }
});

// POST: Register
// @ts-ignore
router.post("/register", async (req, res) => {
    const { username, password } = req.body.user;
    const user: User = { username, password };

    try {
        const registration = await createUser(user);
        return res.status(201).json(registration);
    } catch (err) {
        console.error("Register error:", err);
        return res.status(401).json({ error: "Registration failed" });
    }
});

// POST: Refresh Token
// @ts-ignore
router.post("/refresh-token", async (req, res) => {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(" ")[1];

    if (!refreshToken) return res.status(401).send("No token provided");

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN as Secret) as { username: string };
        const newAccessToken = jwt.sign(
            { username: payload.username },
            process.env.SECRET_KEY as Secret,
            { expiresIn: "15m" }
        );

        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        console.error("Refresh token error:", err);
        return res.status(401).json({ error: "Invalid refresh token" });
    }
});

// Middleware: Authenticate Access Token
export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).send("No token provided");
        return;
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_KEY as Secret) as { username: string };
        req.body.username = payload.username;
        next(); // Always call next if successful
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(401).send("Invalid or expired token");
    }
}

export default router;
