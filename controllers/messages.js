const Message = require("../model/messages");

function getHistoryMsg(req, res) {
  Message.history()
    .then((r) => {
      let history = r.map((v) => v.json);
      res.status(200).json(history);
    })
    .catch((e) => console.log(e));
}

module.exports = { getHistoryMsg };
