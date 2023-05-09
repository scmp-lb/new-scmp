import mongoose from "mongoose";
import dotenv from "dotenv";

/* DOTENV CONFIG */
dotenv.config();

/* CONFIGURING MONGOOSE */
mongoose.set("strictQuery", true);

/* CONNECTING TO DB */
const connectDB = async () => {
  try {
    await mongoose
      .connect(process.env.LOCAL_DB)
      .then(() => console.log("DB connected"));
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDB;
