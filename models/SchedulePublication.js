const mongoose = require('mongoose');

const schedulePublicationSchema = new mongoose.Schema({
    page: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Page',
        required: true
    },
    publishDate: {
        type: Date,
        required: true
    },
    publishTime:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: ['Scheduled', 'Published', 'Canceled',"Deleted"],
        default: 'Scheduled'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('SchedulePublication', schedulePublicationSchema);
