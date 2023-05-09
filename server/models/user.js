import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = Schema({
  name: {
    type: String,
    required: [true, "Please provide your name."],
  },
  email: {
    type: String,
    lowerCase: true,
    unique: [true, "This email is already exists."],
    required: [true, "Please provide your email."],
  },
  password: {
    type: String,
    required: [true, "Please choose your password."],
  },
  role: {
    type: String,
    default: "",
  },
});

/* DOCUMENT MIDDLEWARE */
userSchema.pre("save", async function (next) {
  //if password is not modified, we return from the function
  if (!this.isModified("password")) return next();
  //hashing the passowrd
  this.password = await bcrypt.hash(this.password, 12);
  //setting the confirm field to undefined
  this.passwordConfirm = undefined;

  next();
});

//comparing passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
