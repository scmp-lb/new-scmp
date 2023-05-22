import { Schema, model } from "mongoose";

const swsSchema = Schema({
 title: {
  type: String,
  unique: [true, "This event already mentioned"],
  required: [true, "Please provide the event name."],
 },

 subTitle: {
  type: String,
  required: [true, "Please enter the event subtitle."],
 },
 Description: {
  type: String,
  required: false,
 },
 sponserImage: {
  public_id: {
   type: String,
   required: true,
  },
  url: {
   type: String,
   required: true,
  },
 },
 link: {
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

 winnerProjectTitle: {
  type: String,
  required: false,
 },
 winnerProjectDesc: {
  type: String,
  required: false,
 },
 linkDesc: {
  type: String,
  required: false,
 },
 SemiFinalProjects: {
  type: String,
  required: [false, "Please provide all projects"],
 },
 FinalProjects: {
  type: String,
  required: [false, "Please provide all projects"],
 },
});

export default model("Sws", swsSchema);
