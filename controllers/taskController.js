const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

exports.createTask = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { project } = req.body;

  try {
    const projectFound = await Project.findById(project);

    if (!projectFound) {
      res.status(404).json({ msg: 'The project does not exists' });
    }

    if (projectFound.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    const taks = new Task(req.body);
    await taks.save();
    res.json({ taks });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in createTask');
  }
};

//get all projects by current user
exports.getTasks = async (req, res) => {
  const { project } = req.body;

  try {
    const projectFound = await Project.findById(project);
    console.log(projectFound);
    if (!projectFound) {
      res.status(404).json({ msg: 'The project does not exists' });
    }

    if (projectFound.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    //get taks by project
    const tasks = await Task.find({ project });
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in createTask');
  }
};

// Update Project

exports.updateTask = async (req, res) => {
  const { project, name, status } = req.body;

  try {
    let taskFound = await Task.findById(req.params.id);

    if (!taskFound) {
      res.status(404).json({ msg: 'The task does not exists' });
    }

    const projectFound = await Project.findById(project);

    if (projectFound.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    const newTask = {};

    if (name) newTask.name = name;

    newTask.status = status;

    console.log(newTask);
    taskFound = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ taskFound });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in updateProject');
  }
};

exports.eliminarTask = async (req, res) => {
  const { project } = req.body;

  try {
    let taskFound = await Task.findById(req.params.id);

    if (!taskFound) {
      res.status(404).json({ msg: 'The task does not exists' });
    }

    const projectFound = await Project.findById(project);

    if (projectFound.createdBy.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'this Action is not allowed for your user' });
    }

    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Task deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).send('An unexpected error occurred in updateProject');
  }
};
