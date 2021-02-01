const router = require('express').Router();
const multer = require('multer');
const { login, logout, register, deleteAccount, changePw, findAll } = require('../controllers/members');

router.get('/', findAll);
router.get('/logout', logout);
router.post('/login', multer().none(), login);
router.post('/register', multer().none(), register);
router.put('/:account', multer().none(), changePw);
router.delete('/:account', deleteAccount);

module.exports = router;
