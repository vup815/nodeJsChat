const Member = require('../model/members');

async function register(req, res) {
  let { account, password } = req.body;
  let member = await Member.findByAccount(account);
  if (member) return res.status(400).send('This account already exist');
  Member.create(account, password)
    .then(() => res.status(302).redirect('/index.html'))
    .catch((e) => console.log(e));
}

async function login(req, res) {
  let { account, password } = req.body;
  let member = await Member.findByAccount(account);
  if (!member) return res.status(401).send('This account does not exist');
  if (member.password !== password) return res.status(401).send('Wrong password');
  req.session.user = { account: account };
  res.status(302).redirect('/chat.html');
}

function logout(req, res) {
  if (req.session.user) req.session.user = {};
  res.status(302).redirect('/index.html');
}

function deleteAccount(req, res) {
  let { account } = req.params;

  Member.delete(account)
    .then((r) => res.status(200).send(r))
    .catch((e) => console.log(e));
}

function changePw(req, res) {
  let { account } = req.params;
  let { password } = req.body;
  Member.update(account, password)
    .then((r) => res.status(200).send(r))
    .catch((e) => console.log(e));
}

function findAll(req, res) {
  Member.findAll()
    .then((r) => res.render('member_list', { members: r }))
    .catch((e) => console.log(e));
}
module.exports = { login, logout, register, deleteAccount, changePw, findAll };
