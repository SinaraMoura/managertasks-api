const express = require('express');
const router = express.Router();

const { registerUsers, login, listUsers, verifyEmail, verifyUser } = require('../controllers/users')
const { authorization } = require('../middlewares/verifyLogin');
const { validationSchema } = require('../middlewares/validationData');
const { schemaUser } = require('../schema/schemaUser');
const { schemaLogin } = require('../schema/schemaLogin');
const { registerTasks, listTasks, detailTask, updateTask, deleteTask } = require('../controllers/todos');
const { schemaTodos } = require('../schema/schemaTodos');

router.get('/user/list', listUsers)
router.post('/user/register', validationSchema(schemaUser), registerUsers);
router.post('/login', validationSchema(schemaLogin), login);
router.get('/email', verifyEmail);

router.use(authorization);
router.get('/user', verifyUser);
router.post('/todos/register', validationSchema(schemaTodos), registerTasks);
router.get('/todos/list', listTasks);
router.get('/todos/detail/:id', detailTask);
router.put('/todos/edit/:id', updateTask);
router.delete('/todos/delete/:id', deleteTask);

module.exports = router;