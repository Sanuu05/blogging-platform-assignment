const Comment = require("../models/comment.model");

exports.createComment = async (req, res) => {
    try {
        // Validate required fields
        const { content, postId } = req.body;
        if(!content || !postId) {
            return res.status(400).json({ message: "Content and postId are required" });
        }
        const comment = new Comment({ content, post: postId, createdBy: req.user.id });
        const savedComment = await comment.save();
        res.status(201).json({ message: "Comment created successfully", data: savedComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// Get comments by post id
exports.getCommentsByPostId = async (req, res) => {
    try {
        // Get comments by post id
        const comments = await Comment.find({post: req.params.postId}).populate("createdBy", "name");
        res.status(200).json({ message: "Comments fetched successfully", data: comments });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
