const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();
socket.on('message', (msg) => {
  showMessage(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg;
  socket.emit('chatMessage', msg.value);
  msg.value = '';
  msg.focus();
});

socket.on('redirect', (url) => (window.location.href = url));

function showMessage(msg) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta">${msg.user} <span>${msg.time}</span></p>
    <p class="text">${msg.msg}</p>`;

  document.querySelector('.chat-messages').appendChild(div);
}

(function queryHistoryMsg() {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      let history = JSON.parse(xhr.responseText);
      history.forEach((v) => showMessage(JSON.parse(v)));
    }
  };
  xhr.open('get', '/messages');
  xhr.send(null);
})();
