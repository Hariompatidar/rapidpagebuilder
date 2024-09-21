const app= require('./app');
const { cloudinaryConnect } = require('./config/cloudinary');
const { dbconnect } = require('./config/database');
const { publishPageCron } = require('./controllers/publishPage');
const dailyMailScheduler = require('./controllers/sendDailyMails');
require("dotenv").config();
const PORT= process.env.PORT || 4000;

// connect database
dbconnect()

// connect cloudinary
cloudinaryConnect()

// send daily mails cron job 
dailyMailScheduler();

// publish page cron job
publishPageCron();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})