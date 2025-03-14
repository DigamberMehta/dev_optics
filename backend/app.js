import express from "express";

import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import cookieParser from "cookie-parser";
dotenv.config({});

const app = express();

// Default middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());




const PORT =3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});