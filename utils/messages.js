const moment = require('moment');

function formatMessage(user, msg) {
  return {
    user,
    msg,
    time: moment().format('YYYY MM DD hh:mm:ss a')
  }
}
module.exports = formatMessage;
