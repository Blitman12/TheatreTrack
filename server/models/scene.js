const mongoose = require("mongoose");

const SceneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    actors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
    }]
},{ versionKey: false });

const Scene = mongoose.model("Scene", SceneSchema);

module.exports = Scene;