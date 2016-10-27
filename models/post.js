var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    exp: String,
    img: [],
    comment: [],
}, {
    timestamps: true
    }
);

module.exports = mongoose.model("post", postSchema);
