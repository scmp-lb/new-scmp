import { Schema, model } from "mongoose";

const projectSchema = Schema({
  title: {
    type: String,
    unique: [true, "This project already mentioned"],
    required: [true, "Please provide the project name."],
  },
  description: {
    type: String,
    required: [true, "Please describe the winner project"],
  },
  winner: {
    type: Boolean,
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

export default model("Project", projectSchema);
