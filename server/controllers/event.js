import cloudinary from "cloudinary";
// import ErrorHandler from "../utils/ErrorHandler.js";
/* IMPORTS FROM MODELS */
import Event from "../models/event.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";

//USER: create a new event => /api/v1/event
export const createEvent = catchAsync(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  let imagesLinks = [];

  try {
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "event",
        transformation: [{ format: "webp" }, { quality: "auto" }],
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  } catch (err) {
    return res.status(400).json({
      err,
      message: err.message,
    });
  }

  req.body.images = imagesLinks;

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    event,
  });
});

//USER: get all events => /api/v1/event
export const getAllEvents = catchAsync(async (req, res, next) => {
  const event = await Event.find();

  res.status(200).json({
    success: true,
    event,
  });
});

// Get event by id
export const getEventById = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const event = await Event.findById(id);
  res.status(200).json({
    success: true,
    event,
  });
});

//Delete Event
export const deleteEvent = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const event = await Event.findById(id);
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

export const editEvent = catchAsync(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(new ErrorHandler("event not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting images associated with the event
    for (let i = 0; i < event.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        event.images[i].public_id
      );
    }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "events",
        transformation: [{ format: "webp" }, { quality: "auto" }],
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    success: true,
    message: "updated successfully",
    event,
  });
});
