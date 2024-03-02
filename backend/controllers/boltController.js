const mongoose = require("mongoose");
const Bolt = require("../models/boltModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

exports.createBolt = catchAsyncErrors(async (req, res, next) => {
  try {
    const bolt = await Bolt.create(req.body);

    res.status(201).json({
      success: true,
      bolt,
    });
  } catch (error) {
    next(error);
  }
});

exports.getAllBolts = catchAsyncErrors(async (req, res, next) => {
  try {
    const bolts = await Bolt.find();

    res.status(200).json({
      success: true,
      bolts,
    });
  } catch (error) {
    next(error);
  }
});

exports.getBoltDetails = catchAsyncErrors(async (req, res, next) => {
  try {
    const bolt = await Bolt.findById(req.params.id);

    if (!bolt) {
      return next(new ErrorHander("Bolt not found", 404));
    }

    res.status(200).json({
      success: true,
      bolt,
    });
  } catch (error) {
    next(error);
  }
});

exports.updateBolt = catchAsyncErrors(async (req, res, next) => {
  try {
    const { id } = req.params;

    let bolt = await Bolt.findById(id);

    if (!bolt) {
      return next(new ErrorHander("Bolt not found", 404));
    }

    bolt = await Bolt.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      bolt,
    });
  } catch (error) {
    next(error);
  }
});

exports.deleteBolt = catchAsyncErrors(async (req, res, next) => {
  try {
    const bolt = await Bolt.findById(req.params.id);

    if (!bolt) {
      return next(new ErrorHander("Bolt not found", 404));
    }

    await bolt.deleteOne();

    res.status(200).json({
      success: true,
      message: "Bolt deleted successfully",
    });
  } catch (error) {
    next(error);
  }
});
