const cron = require("node-cron");
const User = require("../models/User");
const SchedulePublication = require("../models/SchedulePublication");
const sendEmail = require("../utils/sendEmail");


const dailyMailScheduler = async () => {
  cron.schedule(
    "1 8 * * *",
    async () => {
      const date = new Date(Date.now());
      const currentDate = date.toLocaleDateString();

      console.log("Cron job running for daily mail *****************************")
    
      const users = await User.find({
        isActive: true,
        isDeleted: false,
        subscribedDailyDigest: true,
      });
      for (const user of users) {
        const publications = await SchedulePublication.find({
          status: "Scheduled",
          publishDate: currentDate,
          createdBy: user._id,
        }).populate("page");


        if (publications.length > 0) {
          let emailContent = "Publications scheduled for today:<br><ul>";
          for (const publication of publications) {
            emailContent += `<li>${
              publication.page.title
            } - ${publication.publishDat} ${publication.publishTime}</li>`;
          }
          emailContent += "</ul>";

          await sendEmail({
            email:user.email,
            subject:"Todays publication",
            message:emailContent
          });
        }
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = dailyMailScheduler;
