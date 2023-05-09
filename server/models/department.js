import { Schema, model } from "mongoose";

const departmentSchema = Schema({
  title: {
    type: String,
    unique: [true, "This departments already exists"],
    required: [true, "Please provide your name."],
  },
  subTitle: {
    type: String,
    unique: [true, "This departments already exists"],
    required: [true, "Please provide your name."],
  },
  description: {
    type: String,
    required: [true, "Please enter teh department description."],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export default model("Department", departmentSchema);
