let rows = document.querySelectorAll('.row');

for (row of rows) {
  row.addEventListener('click', function (e) {
    let account = this.querySelector('.account').innerText.trim();
    let password = this.querySelector('input').value.trim();
    if (e.target.innerText.trim() === '更改密碼') {
      update(account, password);
    }
    if (e.target.innerText.trim() === '刪除帳號') {
      deleteAccount(account, this);
    }
  });
}

function deleteAccount(account, element) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      element.remove();
    }
  };
  xhr.open('delete', `/members/${account}`);
  xhr.send(null);
}

function update(account, password) {
  let xhr = new XMLHttpRequest();

  xhr.open('put', `/members/${account}`);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.send(JSON.stringify({ password: password }));
}
