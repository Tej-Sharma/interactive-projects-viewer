const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// To configure the environment variables in a dedicated file for it (more organization)
require("dotenv").config();

// Set up express on either the default environment port or 5000
const app = express();
const port = process.env.PORT || 5000;

// Use cors and JSON
app.use(cors());
app.use(express.json());

// Set up MongoDB Atlas
const uri = process.env.MONGO_ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(">>> Backend is successfully connected to MongoDB");
});

const homeRouter = require("./routes/home");
// Add the home router to handle CRUD operations
app.use("/", homeRouter);

// Run the server
app.listen(port, () => {
  console.log(`>>> The server is listening on: ${port}`);
});
