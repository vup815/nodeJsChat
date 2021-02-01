const moment = require("moment");

function formatMessage(user, msg) {
  return {
    user,
    msg,
    time: moment().format("YYYY MM DD hh:mm:ss a"),
  };
}

function testJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);

    if (o && typeof o === "object") {
      return true;
    }
  } catch (e) {}

  return false;
}

module.exports = { formatMessage, testJSON };
