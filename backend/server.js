import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
import connectDB from "./middlewares/mongodb.js";
import connectCloudinary from "./middlewares/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRouter.js";
import {app, server} from "./middlewares/socket.js";
////////////////////////////////////////




const PORT = process.env.PORT || 1120
dotenv.config()

connectCloudinary()
app.use(cors({
    origin: 'https://tg-puce-six.vercel.app', // Укажи конкретный фронтенд-URL
    credentials: true, // Включает поддержку кук и заголовков авторизации))
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use((req, res, next) => {
    const allowedOrigins = ['https://tg-puce-six.vercel.app'];
    const origin = req.headers.origin;

    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    }

    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
});



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRouter)
app.use('/api/message', messageRouter)
app.get('/', (request, response) => response.send('Api работает'))




server.listen( PORT,async () => {
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
    await connectDB()
})
