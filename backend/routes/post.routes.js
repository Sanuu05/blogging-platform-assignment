const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const { authenticateToken } = require("../middleware/authMiddleware");

// Create a new post
router.post("/", authenticateToken, postController.createPost);
// Get all posts
router.get("/", postController.getPosts);
// Get a post by id
router.get("/:id", postController.getPostById);
// Update a post
router.put("/:id", authenticateToken, postController.updatePost);
// Delete a post
router.delete("/:id", authenticateToken, postController.deletePost);

module.exports = router;