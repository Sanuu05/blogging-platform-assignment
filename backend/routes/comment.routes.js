const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
const { authenticateToken } = require("../middleware/authMiddleware");
// Create a new comment
router.post("/", authenticateToken, commentController.createComment);
// Get comments by post id
router.get("/:postId", commentController.getCommentsByPostId);

module.exports = router;