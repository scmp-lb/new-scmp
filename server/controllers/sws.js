import cloudinary from "cloudinary";

import Sws from "../models/sws.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";
import sws from "../models/sws.js";

//USER: create a new event => /api/v1/sws
export const createSws = catchAsync(async (req, res, next) => {
 let images = [];

 if (typeof req.body.images === "string") {
  images.push(req.body.images);
 } else {
  images = req.body.images;
 }

 let imagesLinks = [];

 for (let i = 0; i < images?.length; i++) {
  const result = await cloudinary.v2.uploader.upload(images[i], {
   folder: "sws",
   transformation: [{ format: "webp" }, { quality: "auto" }],
  });

  imagesLinks.push({
   public_id: result.public_id,
   url: result.secure_url,
  });
 }

 req.body.images = imagesLinks;

 //upload sponsered image

 const resultt = await cloudinary.v2.uploader.upload(req.body.sponserImage, {
  folder: "sws",
  transformation: [{ format: "webp" }, { quality: "auto" }],
 });
 const sponseredImage = {
  public_id: resultt.public_id,
  url: resultt.secure_url,
 };
 const sws = await Sws.create({
  title: req.body.title,
  subTitle: req.body.subTitle,
  Description: req.body.Description,
  sponserImage: sponseredImage,
  link: req.body.link,
  images: imagesLinks,
  winnerProjectTitle: req.body.winnerProjectTitle,
  winnerProjectDesc: req.body.winnerProjectDesc,
  linkDesc: req.body.linkDesc,
  SemiFinalProjects: req.body.SemiFinalProjects,
  FinalProjects: req.body.FinalProjects,
 });

 res.status(201).json({
  success: true,
  sws,
 });
});

//USER: get all sws => /api/v1/sws
export const getAllSws = catchAsync(async (req, res, next) => {
 const sws = await Sws.find();

 res.status(200).json({
  success: true,
  sws,
 });
});

//DELETE SWS EVENT
export const deleteSWSEvent = catchAsync(async (req, res, next) => {
 let { id } = req.params;
 const event = await Sws.findById(id);
 if (!event) {
  return next(new ErrorHandler("No Events with this id!", 404));
 } else {
  await event.delete();
  res.status(200).json({
   success: true,
   message: "deleted successfully",
  });
 }
});

//EDIT SWS EVENT

//Edit Event
export const editSWSEvent = catchAsync(async (req, res, next) => {
 let { id } = req.params;

 let event = await Sws.findById(id);

 if (!event) {
  return next(new ErrorHandler("No Events with this id!", 404));
 }

 let images = [];

 if (typeof req.body.images === "string") {
  images.push(req.body.images);
 } else {
  images = req.body.images;
 }

 //Delete old images
 if (images !== undefined) {
  // Deleting images associated with the event
  for (let i = 0; i < event.images.length; i++) {
   const result = await cloudinary.v2.uploader.destroy(
    event.images[i].public_id
   );
  }
  let imagesLinks = [];
  for (let i = 0; i < images?.length; i++) {
   const result = await cloudinary.v2.uploader.upload(images[i], {
    folder: "event",
    transformation: [{ format: "webp" }, { quality: "auto" }],
   });

   imagesLinks.push({
    public_id: result.public_id,
    url: result.secure_url,
   });
  }
  req.body.images = imagesLinks;
 }
 //Delete old sponsered image
 req.body.sponserImage
  ? await cloudinary.v2.uploader.destroy(event.sponserImage)
  : "";

 //uploading photo
 const photoUpload = req.body.sponserImage
  ? await cloudinary.v2.uploader.upload(req.body.sponserImage, {
     folder: "sws",
     transformation: [{ format: "webp" }, { quality: "auto" }],
    })
  : "";

 const sponseredImage = {
  public_id: photoUpload.public_id,
  url: photoUpload.secure_url,
 };

 // update event
 event = await Sws.findByIdAndUpdate(req.params.id, {
  title: req.body.title,
  subTitle: req.body.subTitle,
  Description: req.body.Description,
  sponserImage: sponseredImage,
  link: req.body.link,
  images: req.body.images,
  winnerProjectTitle: req.body.winnerProjectTitle,
  winnerProjectDesc: req.body.winnerProjectDesc,
  linkDesc: req.body.linkDesc,
  SemiFinalProjects: req.body.SemiFinalProjects,
  FinalProjects: req.body.FinalProjects,
 });

 res.status(200).json({
  success: true,
  message: "updated successfully",
  event,
 });
});

//USER: get one sws => /api/v1/sws/:id
export const getOneSws = catchAsync(async (req, res, next) => {
 const sws = await Sws.findById(req.params.id);

 res.status(200).json({
  success: true,
  sws,
 });
});
