import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes, { authenticateToken } from "./routes/auth-routes";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
app.use(
    cors({
        origin: "http://localhost:5175", // Update with your frontend's URL
        methods: ["GET", "POST"],
        credentials: true,
    })
);

// Logging the secret key for debugging purposes
console.log("Loaded SECRET_KEY:", process.env.SECRET_KEY);

// Authentication Routes
app.use("/auth", authRoutes);

// Token Authentication Middleware (for secured routes)
app.use(authenticateToken);

// Sample Secured Route
app.get("/customers", async (req: express.Request, res: express.Response) => {
    const customer = { id: "1", name: "Ramindu" };
    const username = req.body.username;
    console.log("Request Username:", username);
    res.json(customer);
});

// Start the server
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
