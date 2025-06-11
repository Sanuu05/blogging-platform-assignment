require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require('cors') 
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();
app.get("/", (req, res) => {
  res.send("Welcome to the backend of the blog app");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

