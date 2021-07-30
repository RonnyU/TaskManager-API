const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const project = new Project(req.body);
    project.createdBy = req.user.id;
    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in createProject');
  }
};

//get all projects by current user
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in getProjects');
  }
};

// Update Project

exports.updateProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;

  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).send('The project does not exists');
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in updateProject');
  }
};

exports.eliminarProject = async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      res.status(404).send('The project does not exists');
    }

    if (project.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    //delete project
    await Project.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: 'Project deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in updateProject');
  }
};
