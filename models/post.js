var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    exp: String,
    desc: String,
    code_before: String,
    code_after: String
});

module.exports = mongoose.model("post", postSchema);
