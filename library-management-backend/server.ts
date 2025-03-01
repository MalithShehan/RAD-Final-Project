import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import customerRoutes from "./routes/customer-routes";
import itemRoutes from "./routes/item-routes";
import orderRoutes from "./routes/order-routes";
import authRoutes, {authenticateToken} from "./routes/auth-routes";


const app = express();
dotenv.config()

app.use(express.json())

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use('/auth',authRoutes)
app.use(authenticateToken)

app.use('/customer',customerRoutes)

app.use('/item',itemRoutes)

app.use('/orders',orderRoutes)

app.listen(3000, () => {
    console.log('Server started on port 3000!');
})