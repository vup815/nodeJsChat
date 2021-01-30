const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
  json:String
});

const Message = mongoose.model('Message', messageSchema);

exports.create = json => {
  let msg = new Message({json: json});
  msg.save();
}

exports.history =  () => {
  return new Promise((resolve, reject) => {
      Message.find((err, res) => {
        if (err) reject(err);
        resolve(res)
      });
  })
}
