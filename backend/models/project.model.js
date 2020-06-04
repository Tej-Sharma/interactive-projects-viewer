const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create a mongoose schema to store the projects data
const projectSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
      minlength: 1,
    },
    country: {
      type: String,
      trim: true, // remove whitespace at the end which may cause errors in comparisons
      required: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    services: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
