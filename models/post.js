var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: {type: String, required: true},
    exp: String,
    img: [],
    author: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
    },
    comment: [],
    feedback: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback"
        }
    ]
}, {
    timestamps: true
    }
);

module.exports = mongoose.model("post", postSchema);
