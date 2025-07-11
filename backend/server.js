require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors') 
const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes");
const PORT = process.env.PORT || 8080;
// Connect to MongoDB
connectDB();
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the backend of the blog app");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

