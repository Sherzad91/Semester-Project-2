import { changeAvatar, insertCommonHead, redirect, setUser } from '../scripts/common.js';
import { post } from '../scripts/requests.js';

document.addEventListener('DOMContentLoaded', function () {
  insertCommonHead('Register');
  document.getElementById('change-avatar').addEventListener('click', changeAvatar);
});

document.getElementById('register-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const formData = new FormData(document.getElementById('register-form'));

  await handleRegister({
    name: formData.get('name'),
    email: formData.get('email'),
    avatar: formData.get('avatar'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  });
});

async function handleRegister(values) {
  const { password, confirm_password } = values;

  if (password !== confirm_password) return alert('Passwords must match');

  const data = await post('/auth/register', values);
  if (!data) return;

  redirect('/login.html');
}
