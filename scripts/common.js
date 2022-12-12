import { put } from './requests.js';
import Header from '../templates/header.js';
import Head from '../templates/head.js';

export function insertHeader() {
  document.body.insertAdjacentHTML('afterbegin', Header());
}

export function insertCommonHead(title) {
  document.head.insertAdjacentHTML('afterbegin', Head(title));
}

export function getUser() {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
}

export function setUser(user) {
  const stringUser = JSON.stringify(user);
  localStorage.setItem('user', stringUser);

  return stringUser;
}

export function redirect(to) {
  window.location.href = to;
}

export async function changeAvatar() {
  const avatar = prompt('New avatar URL');
  const user = getUser();
  if (!avatar || !user) return;
  const data = await put(
    `/profiles/${user?.name}/media`,
    { avatar },
    { Authorization: 'Bearer ' + user?.accessToken }
  );
  if (!data) return;

  user.avatar = avatar;
  setUser(user);

  window.location.reload();
}

export const API_URL = 'https://api.noroff.dev/api/v1/auction';
