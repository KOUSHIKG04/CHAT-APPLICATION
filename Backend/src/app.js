import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "22kb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "22kb",
  })
);

app.use(express.static("public"));
app.use(cookieParser());

import authRoutes from "./Routes/auth.routes.js";
import mssgRoutes from "./Routes/message.routes.js";
app.use("/api/mssg", mssgRoutes);
app.use("/api/auth", authRoutes);

export { app };
