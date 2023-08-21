const express = require('express');
const router = express.Router();

const { registerUsers, login, listUsers, verifyEmail, verifyUser } = require('../controllers/users')
const { verifyLogin, authorization } = require('../middlewares/verifyLogin');
const { validationSchema } = require('../middlewares/validationData');
const { schemaUser } = require('../schema/schemaUser');
const { schemaLogin } = require('../schema/schemaLogin');

router.get('/', listUsers)
router.post('/register', validationSchema(schemaUser), registerUsers);
router.post('/login', validationSchema(schemaLogin), login);
router.get('/email', verifyEmail);

router.use(authorization);
router.get('/user', verifyUser);

module.exports = router;