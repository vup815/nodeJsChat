const router = require("express").Router();
const { createMessage, getHistoryMsg } = require('../controllers/messages');

router.get('/', getHistoryMsg);
router.post('/', createMessage);

module.exports = router;
