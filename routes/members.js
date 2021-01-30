const router = require("express").Router();
const multer = require("multer");
const { login, logout, register } = require("../controllers/members");

router.get('/logout', logout);
router.post('/login', multer().none(), login);
router.post('/register', multer().none(), register)

module.exports = router;
