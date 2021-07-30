const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

// api/project
router.post(
  '/',
  auth,
  [check('name', 'The project name is required').not().isEmpty()],
  projectController.createProject
);

router.get('/', auth, projectController.getProjects);

router.put(
  '/:id',
  auth,
  [check('name', 'The project name is required').not().isEmpty()],
  projectController.updateProject
);

router.delete('/:id', auth, projectController.eliminarProject);

module.exports = router;
