import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoute from "./routes/auth.routes";
import taskRoute from "./routes/task.routes";

const app = express();
app.use(morgan("dev"));
app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/task", taskRoute);
export default app;
