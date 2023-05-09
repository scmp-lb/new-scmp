import cloudinary from "cloudinary";

import Project from "../models/project.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";

//USER: create a new project => /api/v1/project
export const createProject = catchAsync(async (req, res, next) => {
  //upload photot into cloudinary
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "departments",
    transformation: [{ format: "webp" }, { quality: "auto" }],
  });

  const projectImage = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  const project = await Project.create({
    title: req.body.title,
    description: req.body.description,
    image: projectImage,
  });

  res.status(201).json({
    success: true,
    project,
  });
});

//USER: get all projects => /api/v1/project
export const getAllProjects = catchAsync(async (req, res, next) => {
  const project = await Project.find();

  res.status(200).json({
    success: true,
    project,
  });
});

//USER: get winner project => /api/v1/project/winner
export const getWinnerProject = catchAsync(async (req, res, next) => {
  const project = await Project.find(req.body.winner);

  res.status(200).json({
    success: true,
    project,
  });
});

//USER: choose winner project => /api/v1/project/:id
export const chooseWinnerProject = catchAsync(async (req, res, next) => {
  const project = await Project.find(req.params.id);

  project.winner = true;

  await project.save();

  res.status(200).json({
    success: true,
    project,
  });
});
