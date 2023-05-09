import cloudinary from "cloudinary";

/* IMPORTS FROM MODELS */
import Department from "../models/department.js";

/* IMPORTS FROM UTILS */
import catchAsync from "../utils/catchAsync.js";
import ErrorHandler from "../utils/errorHandler.js";

//USER: create a new department => /api/v1/department
export const createDepartment = catchAsync(async (req, res, next) => {
  //upload photos into cloudinary
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "departments",
    transformation: [{ format: "webp" }, { quality: "auto" }],
  });

  const departmentImage = {
    public_id: result.public_id,
    url: result.secure_url,
  };

  const department = await Department.create({
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    image: departmentImage,
  });

  res.status(201).json({
    success: true,
    department,
  });
});

//USER: get all departemnts => /api/v1/department
export const getAllDepartments = catchAsync(async (req, res, next) => {
  const department = await Department.find();

  res.status(200).json({
    success: true,
    department,
  });
});

// Get department by id
export const getDepartmentById = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const department = await Department.findById(id);
  res.status(200).json({
    success: true,
    department,
  });
});

//Edit one Department
export const editDepartment = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  let department = await Department.findById(id);
  if (!department) {
    return next(new ErrorHandler("No Departments with this id!", 404));
  }

  //Delete old photo
  req.body.image ? await cloudinary.v2.uploader.destroy(department.image) : "";

  //uploading photo
  const photoUpload = req.body.image
    ? await cloudinary.v2.uploader.upload(req.body.image, {
        folder: "departments",
        transformation: [{ format: "webp" }, { quality: "auto" }],
      })
    : "";

  const results = {
    public_id: photoUpload.public_id,
    url: photoUpload.secure_url,
  };

  //update department
  department = await Department.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    subTitle: req.body.subTitle,
    description: req.body.description,
    image: results,
  });

  res.status(200).json({
    success: true,
    message: "updated successfully",
    department,
  });
});

//Delete Department
export const deleteDepartment = catchAsync(async (req, res, next) => {
  let { id } = req.params;
  const department = await Department.findById(id);
  if (!department) {
    return next(new ErrorHandler("No Departments with this id!", 404));
  } else {
    await department.delete();
    res.status(200).json({
      success: true,
      message: "deleted successfully",
    });
  }
});
