import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./models/index.js";
import ProductRoutes from "./routes/product.js";

dotenv.config({});

const app = express();

// Default middlewares
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use("/api", ProductRoutes);

// Optional: You can add a simple route to check the database connection
app.get('/api/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).send('Database is healthy!');
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(503).send('Database connection failed.');
    }
});