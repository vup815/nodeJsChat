const router = require("express").Router();
const { createMessage, getHistoryMsg } = require('../controllers/messages');

router.get('/', getHistoryMsg);

module.exports = router;
