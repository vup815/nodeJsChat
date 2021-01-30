const Message = require("../model/messages");

function createMessage(json) {
  Message.create(json);
}
function getHistoryMsg(req, res) {
  Message.history()
    .then((r) => {
      let history = r.map((v) => v.json);
      res.json(history);
    })
    .catch((e) => console.log(e));
}

module.exports = { createMessage, getHistoryMsg };
