const router = require("express").Router();
const Project = require("../models/project.model"); // MongoDB data model for project

router.route("/").get((req, res) => {
  Project.find()
    .then((projects) => res.json(projects))
    .catch((err) =>
      res.status(400).json("Error retrieving projects from MongoDB")
    );
});

router.route("/add").post((req, res) => {
  const company = req.body.company;
  const country = req.body.country;
  const description = req.body.description;
  const services = req.body.services;

  const newProject = new Project({
    company,
    country,
    description,
    services,
  });

  newProject
    .save()
    .then(() => res.json("New projet added to MongoDB"))
    .catch((err) =>
      res.status(400).json("Error adding project to MongoDB: " + err)
    );
});

module.exports = router;
