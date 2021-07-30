const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/task
router.post(
  '/',
  auth,
  [
    check('name', 'The task name is required').not().isEmpty(),
    check('project', 'The project  is required').not().isEmpty(),
  ],
  taskController.createTask
);

router.get('/', auth, taskController.getTasks);

router.put('/:id', auth, taskController.updateTask);

router.delete('/:id', auth, taskController.eliminarTask);

module.exports = router;
