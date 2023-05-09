import dotenv from "dotenv";
import cloudinary from "cloudinary";

/* FILES IMPORTS */
import app from "./app.js";
import connectDB from "./database.js";

/* HANDLE UNCAUGHT EXEPTIONS */
process.on("uncaughtException", (err) => {
 console.log(`ERROR: ${err.message}`);
 console.log("Shutting down server due to uncaught exeptions");

 process.exit(1);
});

/* DOTENV CONFIG */
if (process.env.NODE_ENV !== "production") {
 dotenv.config();
}

//cloudinary configuration
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* STARTING THE SERVER */
app.listen(process.env.PORT, () => {
 console.log(
  `Server is running: ${process.env.NODE_ENV} on port: ${process.env.PORT}`
 );
 connectDB();
});

/* HANDLE UNHANDLED REJECTION */
process.on("unhandledRejection", (err) => {
 console.log(`ERROR: ${err.message}`);
 console.log("Shutting down server due to unhandled rejection");

 server.close(() => {
  process.exit(1);
 });
});
