import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoSanitize from "express-mongo-sanitize";
import hpp from "hpp";
import xss from "xss-clean";
import cors from "cors";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

/* IMPORTs FROM MIDDLEWARE */
import errorMiddleware from "./middlewares/error.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/* CREATING THE EXPRESS APP */
const app = express();

/* DOTENV CONFIG */
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

/* CONFIGURATING THE APP */
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(fileUpload());

/* IMPORTING ROUTES */
import userRouter from "./routes/user.js";
import departmentRouter from "./routes/department.js";
import eventRouter from "./routes/event.js";
import swsRouter from "./routes/sws.js";
import projectRouter from "./routes/project.js";

/* MOUNTING ROUTES */
app.use("/api/v1/user", userRouter);
app.use("/api/v1/department", departmentRouter);
app.use("/api/v1/event", eventRouter);
app.use("/api/v1/sws", swsRouter);
app.use("/api/v1/project", projectRouter);

// allow app to use build file
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

//using error middleware in the app
app.use(errorMiddleware);

export default app;
