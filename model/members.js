const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    maxlength: 20
  }
});

const Member = mongoose.model('Member', memberSchema);

exports.register = (account, password) => {
  let member = new Member({account: account, password: password});
  member.save();
}

exports.findByAccount = (account) => {
  return new Promise((resolve, reject) => {
    Member.findOne({account: account}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}

exports.delete = (account) => {
  Member.deleteOne({account: account});
}

exports.modify = (data) => {

}
