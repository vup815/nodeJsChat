const path = require("path"),
  http = require("http"),
  express = require("express"),
  socketio = require("socket.io"),
  session = require("express-session"),
  {formatMessage} = require("./utils/messages"),
  mongoDB = require("./database/mongoDB"),
  messageRouter = require("./routes/messages"),
  messageModel = require("./model/messages"),
  memberRouter = require("./routes/members");

const app = express();
const Bot = "ChatBot";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const sessionMiddleware = session({
  secret: "Yuuki saiko",
  resave: false,
  saveUninitialized: true,
});
app.use(sessionMiddleware);
app.use(express.static(path.join(__dirname, "public")));
app.use("/messages", messageRouter);
app.use("/members", memberRouter);
mongoDB.on("error", console.error.bind(console, "MongoDB connection error:"));

const server = http.createServer(app);
const io = socketio(server);
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  const session = socket.request.session;
  socket.emit("message", formatMessage(Bot, "Welcome"));
  socket.broadcast.emit(
    "message",
    formatMessage(Bot, `${session.user.account} has joined the chat`)
  );
  socket.on("disconnect", () => {
    // io.emit("message", formatMessage(Bot, `${session.user.account} has joined the chat`));
  });
  socket.on("chatMessage", (msg) => {
    if (!session.user || !session.user.account) {
      io.emit("redirect", "index.html");
    } else {
      let msgObj = formatMessage(session.user.account, msg);
      io.emit("message", msgObj);
      messageModel.create(JSON.stringify(msgObj));
    }
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));

module.exports = app;
