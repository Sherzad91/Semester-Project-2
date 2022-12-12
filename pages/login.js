import { changeAvatar, insertCommonHead, redirect, setUser } from '../scripts/common.js';
import { post } from '../scripts/requests.js';

document.addEventListener('DOMContentLoaded', function () {
  insertCommonHead('Login');
  document.getElementById('change-avatar').addEventListener('click', changeAvatar);
});

document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById('login-form'));

  await handleLogin(formData.get('email'), formData.get('password'));
});

async function handleLogin(email, password) {
  const data = await post('/auth/login', { email, password });
  if (!data) return;
  setUser(data);
  redirect('/index.html');
}
