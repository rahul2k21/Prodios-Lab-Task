const express = require('express');
const router = express.Router();
const { createTask, getAllTasks, updateTask, deleteTask } = require('../controller/taskController.js');
const { isAuthorized } = require("../utils/authMiddleware.js");

router.post('/create', isAuthorized, createTask);        
router.get('/getTasks', isAuthorized, getAllTasks);
router.put('/:id', isAuthorized,updateTask);         
router.delete('/:id', isAuthorized, deleteTask);     

module.exports = router;
