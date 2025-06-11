const mongoose = require("mongoose");
// Comment schema
const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
}, {
    timestamps: true,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;