const express = require('express');
const router = express.Router();

const { registerUsers, login, listUsers, verifyEmail, verifyUser } = require('../controllers/users')
const { authorization } = require('../middlewares/verifyLogin');
const { validationSchema } = require('../middlewares/validationData');
const { schemaUser } = require('../schema/schemaUser');
const { schemaLogin } = require('../schema/schemaLogin');
const { registerTasks, listTasks, detailTask, updateTask, deleteTask } = require('../controllers/todos');
const { schemaTodos } = require('../schema/schemaTodos');

router.get('/', listUsers)
router.post('/register', validationSchema(schemaUser), registerUsers);
router.post('/login', validationSchema(schemaLogin), login);
router.get('/email', verifyEmail);

router.use(authorization);
router.get('/user', verifyUser);
router.post('/todos', validationSchema(schemaTodos), registerTasks);
router.get('/todos', listTasks);
router.get('/todos/detail/:id', detailTask);
router.put('/todos/:id', validationSchema(schemaTodos), updateTask);
router.delete('/todos/:id', deleteTask);

module.exports = router;