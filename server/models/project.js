const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    heroImage: {
        type: String,
        default: 'https://wallpapercave.com/wp/wp6685845.jpg'
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }],
    acts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Act'
    }],
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
