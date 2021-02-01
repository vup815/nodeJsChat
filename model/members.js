const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
  account: {
    type: String,
    required: true,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    maxlength: 20,
  },
});

const Member = mongoose.model('Member', memberSchema);

exports.create = (account, password) => {
  let member = new Member({ account: account, password: password });
  return new Promise((resolve, reject) => {
    member.save((err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.findByAccount = (account) => {
  return new Promise((resolve, reject) => {
    Member.findOne({ account: account }, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.delete = (account) => {
  return new Promise((resolve, reject) => {
    Member.findOneAndDelete({ account: account }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.update = (account, password) => {
  return new Promise((resolve, reject) => {
    Member.findOneAndUpdate({ account: account }, { $set: { password: password } }, { new: true }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.findAll = () => {
  return new Promise((resolve, reject) => {
    Member.find((err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};
