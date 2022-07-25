const mongoose = require("mongoose");

const ActorSchema = new mongoose.Schema({
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
    currentCharacter: {
        type: String
    },
    pastCharacters: [{
        type: String
    }]
},{ versionKey: false });

const Actor = mongoose.model("Actor", ActorSchema);

module.exports = Actor;
