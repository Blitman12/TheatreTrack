const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    heroImage: {
        type: String,
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }],
    staff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    }]
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
