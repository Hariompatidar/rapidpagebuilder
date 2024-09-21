const cron = require("node-cron");
const catchAsyncErrors = require("../utils/catchAsyncErrors");
const SchedulePublication = require("../models/SchedulePublication");
const Page = require("../models/Page");
const sendEmail = require("../utils/sendEmail");

exports.publishPageCron = catchAsyncErrors(async () => {
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Publish cron job running...");
            // const date = new Date();
            // const currentDate = date.toLocaleDateString();
            // const currentTime = date.toLocaleTimeString("default", {
            //     hour: "2-digit",
            //     minute: "2-digit",
            //     hour12: false,
            // });

            // const scheduledPublications = await SchedulePublication.find({
            //     status: "Scheduled",
            //     publishDate: currentDate,
            //     publishTime: currentTime,
            // }).populate("createdBy");

            const date = new Date();

            const indiaTime = new Date(
                date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
            );
            const currentDate = indiaTime.toISOString().split("T")[0]; 
            const currentTime = indiaTime
                .toISOString()
                .split("T")[1]
                .slice(0, 5);

            const scheduledPublications = await SchedulePublication.find({
                status: "Scheduled",
                publishDate: currentDate,
                publishTime: currentTime,
            }).populate("createdBy");

            scheduledPublications.forEach(async (scheduledPublication) => {
                scheduledPublication.status = "Published";
                await scheduledPublication.save();

                const page = await Page.findByIdAndUpdate(
                    scheduledPublication.page,
                    {
                        status: "Published",
                    },
                    {
                        new: true,
                    }
                ).populate("createdBy");

                console.log(
                    `Page ${page._id} published at ${currentDate} ${currentTime}`
                );

                await sendEmail({
                    email: page.createdBy.email,
                    subject: "Your Page Has Been Published",
                    userName: `${page.createdBy.firstName} ${page.createdBy.lastName}`,
                    pageTitle: page.title,
                    publishDate: currentDate,
                    publishTime: currentTime,
                    pageUrl: `${process.env.FRONTEND_URL}/pages/${page.slug}`,
                });
            });
        } catch (error) {
            console.log("Error inside the publish cron job: " + error);
        }
    });
});
