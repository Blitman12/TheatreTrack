const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true
    }
});

const Staff = mongoose.model("Staff", StaffSchema);

module.exports = Staff;
