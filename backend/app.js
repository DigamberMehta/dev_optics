import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sequelize } from "./models/index.js";
import ProductRoutes from "./routes/product.js";
import CartRoutes from "./routes/cart.js";
import userProfiles from "./routes/userProfile.js";
import orderRoutes from "./routes/order.js";
import UserRoute from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import AppointmentRoutes from "./routes/appointments.js";
// import WishlistsModel from "./models/wishlists.js";
dotenv.config({});

const app = express();

// Default middlewares
app.use(express.json());
app.use(cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://dev-optics-bbiq.vercel.app"
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  }));
  
app.use(cookieParser());

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

 
  
app.use("/api/products", ProductRoutes);
app.use("/api/cart", CartRoutes);
app.use("/api/user/profile", userProfiles);
app.use("/api/orders", orderRoutes);
app.use("/api", UserRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", AppointmentRoutes);


// app.use("/api/wishlist" , WishlistsModel);

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