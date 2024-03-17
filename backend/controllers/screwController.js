const mongoose = require("mongoose");
const Screw = require("../models/screwModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.create(req.body);

    res.status(201).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllScrews = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body)
  const screwsCount = await Screw.countDocuments();
  const resultPerPage = 500;

  const apiFeatures = new ApiFeatures(Screw.find(), req.query).search().pagination(resultPerPage).filter();
  const screws = await apiFeatures.query;

  res.status(200).json({
    success: true,
    screws,
    screwsCount,
    resultPerPage,
  });
});








exports.getScrewDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.findById(req.params.id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    res.status(200).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.updateScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    let screw = await Screw.findById(id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    screw = await Screw.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      screw,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteScrew = catchAsyncErrors(async (req, res, next) => {
  try {
    const screw = await Screw.findById(req.params.id);

    if (!screw) {
      return next(new ErrorHander("Screw not found", 404));
    }

    await screw.deleteOne();

    res.status(200).json({
      success: true,
      message: "Screw deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
