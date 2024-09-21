const Page = require("../models/Page");
const ErrorHandler = require("../utils/errorHandler");
const SchedulePublication = require("../models/SchedulePublication");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.schedulePublish = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { publishDate, publishTime } = req.body;


  if (!id || !publishDate || !publishTime) {
    return next(new ErrorHandler("Please fill all the fields", 400));
  }

  let page = await Page.findById(id)
  if (!page || page.status === "Scheduled" || page.status === "Published") {
    return next(new ErrorHandler("Something went wrong", 404));
  }

  await SchedulePublication.create({
    page: id,
    publishDate:new Date(publishDate).toLocaleDateString(),
    publishTime,
    status: "Scheduled",
    createdBy: req.user.id,
  });

  page.status = "Scheduled";
  page.publishDate = new Date(publishDate).toLocaleDateString();
  page.publishTime = publishTime;
  page = await page.save();

  res.status(201).json({
    success: true,
    message: "Page scheduled for publication",
  });
});

exports.updateScheduledPublish = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { publishDate, publishTime } = req.body;

  if (!publishDate || !publishTime || !id) {
    return next(new ErrorHandler("Please provide all the fields", 400));
  }

  const page = await Page.findById(id);
  if (!page) {
    return next(new ErrorHandler("Page not found", 404));
  }

  const scheduledPublication = await SchedulePublication.findOne({ page: id });
  if (!scheduledPublication || scheduledPublication.status === "Published") {
    return next(
      new ErrorHandler("Something went wrong or page is already published", 404)
    );
  }


  scheduledPublication.publishDate=new Date(publishDate).toLocaleDateString();;
  scheduledPublication.publishTime=publishTime;
  await scheduledPublication.save();

  page.publishDate = new Date(publishDate).toLocaleDateString();
  page.publishTime = publishTime;
  await page.save();

  res.status(200).json({
    success: true,
    message: "Page publication time updated",
  });
});


exports.cancelScheduledPublish = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const page = await Page.findById(id);
  if (!page || page.status === "Published") {
    return next(
      new ErrorHandler("Something went wrong or page is already published", 400)
    );
  }

  const scheduledPublication = await SchedulePublication.findOne({ page: id });
  if (!scheduledPublication) {
    return next(new ErrorHandler("Scheduled page not found", 404));
  }

  scheduledPublication.status = "Canceled";
  await scheduledPublication.save();

  page.status = "Draft";
  page.publishDate = null;
  page.publishTime = null;
  await page.save();

  res.status(200).json({
    success: true,
    message: "Scheduled publication canceled",
    data: page,
  });
});
