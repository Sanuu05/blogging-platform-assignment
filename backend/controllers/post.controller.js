const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
    try {
        // Validate required fields
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        const post = new Post({ title, content, author: req.user.id });
        const savedPost = await post.save();
        res.status(201).json({ message: "Post created successfully", data: savedPost });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        // Get all posts with comments
        const posts = await Post.aggregate([
            {
                $lookup: {
                    from: "comments",
                    localField: "_id",
                    foreignField: "post",
                    as: "comments"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                }
            },
            {
                $addFields: {
                    author: { $arrayElemAt: ["$author", 0] },
                    comments: {
                        $slice: [
                            { $sortArray: { input: "$comments", sortBy: { createdAt: -1 } } },
                            0,
                            3
                        ]
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    title: 1,
                    content: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    "author.name": 1,
                    "author._id": 1,
                    comments: 1
                }
            }
        ]);

        res.status(200).json({ message: "Posts fetched successfully", data: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getPostById = async (req, res) => {
    try {
        // Get post by id
        const post = await Post.findById(req.params.id).populate("author", "name");
        // Check if post exists
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ message: "Post fetched successfully", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getMyPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user.id }).populate("author", "name");
        if (!posts) {
            return res.status(404).json({ message: "No posts found" });
        }
        res.status(200).json({ message: "Posts fetched successfully", data: posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updatePost = async (req, res) => {
    try {
        // Validate required fields
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        // Check if post exists and is owned by the user
        const post = await Post.findByIdAndUpdate({ _id: req.params.id, author: req.user.id }, { title, content }, { new: true });
        if (!post) {
            return res.status(404).json({ message: "Post not found or you are not the author" });
        }
        res.status(200).json({ message: "Post updated successfully", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deletePost = async (req, res) => {
    try {
        // Check if post exists and is owned by the user
        const post = await Post.findByIdAndDelete({ _id: req.params.id, author: req.user.id });
        if (!post) {
            return res.status(404).json({ message: "Post not found or you are not the author" });
        }
        res.status(200).json({ message: "Post deleted successfully", data: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
