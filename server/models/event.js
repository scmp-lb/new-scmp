import { Schema, model } from "mongoose";

const eventSchema = Schema(
  {
    title: {
      type: String,
      unique: [true, "This event already mentioned"],
      required: [true, "Please provide the event name."],
    },
    subtitle: {
      type: String,
      required: [true, "Please provide the event subtitle."],
    },
    description: {
      type: String,
      required: [true, "Please enter the event description."],
    },
    date: {
      type: String,
      required: [true, "please enter a date"],
    },
    videoLink1: {
      type: String,
      required: false,
    },
    videoLink2: {
      type: String,
      required: false,
    },
    videoLink3: {
      type: String,
      required: false,
    },
    videoLink4: {
      type: String,
      required: false,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model("Event", eventSchema);
