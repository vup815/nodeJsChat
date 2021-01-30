const Member = require("../model/members");

async function register(req, res) {
  let { account, password } = req.body;
  let member = await Member.findByAccount(account);
  if (member) return res.send("This account already exist");
  Member.register(account, password);
  res.redirect("/index.html");
}

async function login(req, res) {
  let { account, password } = req.body;
  let member = await Member.findByAccount(account);
  if (!member) return res.send("This account does not exist");
  if (member.password !== password) return res.send("Wrong password");
  req.session.user = { account: account };
  res.redirect("/chat.html");
}

function logout(req, res) {
  if (req.session.user) req.session.user = {};
  res.redirect("/index.html");
}

module.exports = { login, logout, register };
