const mongoose = require("mongoose");

const ActSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    scenes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scene'
    }]
},{ versionKey: false });

const Act = mongoose.model("Act", ActSchema);

module.exports = Act;