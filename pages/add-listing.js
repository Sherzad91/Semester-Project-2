import { getUser, insertCommonHead, insertHeader, changeAvatar } from '../scripts/common.js';
import { post } from '../scripts/requests.js';

const imageInput = document.getElementById('image-input');
const imageHolder = document.getElementById('image-holder');
const images = [];

const tagInput = document.getElementById('tag-input');
const tagHolder = document.getElementById('tag-holder');
const tags = [];

document.addEventListener('DOMContentLoaded', function (e) {
  if (!getUser) return (window.location.href = '/index.html');
  insertCommonHead('Add New Listing');
  insertHeader();
  document.getElementById('change-avatar').addEventListener('click', changeAvatar);
});

document.getElementById('add-image-btn').addEventListener('click', handleAddImage);
document.getElementById('add-tag-btn').addEventListener('click', handleAddTag);
document.getElementById('add-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(document.getElementById('add-form'));

  await handleAddListing({
    title: formData.get('title'),
    description: formData.get('description'),
    endsAt: formData.get('endsAt'),
  });
});

function handleAddImage() {
  let value = imageInput.value;

  if (!value) {
    return alert('Image URL is required');
  }

  images.push(value);
  renderImages();
}

function handleAddTag() {
  let value = tagInput.value;
  if (!value) {
    return alert('Tag is required');
  }

  tags.push(value);
  renderTags();
}

function renderImages() {
  if (images.length === 0) {
    imageHolder.classList.add('hidden');
  } else {
    imageHolder.classList.remove('hidden');
  }

  imageHolder.innerHTML = '';
  images.map((media, index) => {
    let image = `
       <img class="object-cover w-full h-40 bg-gray-50 rounded-lg border overflow-hidden shrink-0" src="${media}" />
     `;
    imageHolder.insertAdjacentHTML('beforeend', image);
  });

  imageInput.value = '';
}

function renderTags() {
  if (tags.length === 0) {
    tagHolder.classList.add('hidden');
  } else {
    tagHolder.classList.remove('hidden');
  }

  tagHolder.innerHTML = '';
  tags.map((t, index) => {
    let tag = `
       <span class='px-2 py-1 rounded-md bg-gray-300 font-semibold'>${t}</span>
     `;
    tagHolder.insertAdjacentHTML('beforeend', tag);
  });

  tagInput.value = '';
}


async function handleAddListing(values) {
  const user = getUser();

  const data = await post(
    '/listings',
    {
      ...values,
      media: images,
      tags,
    },
    { Authorization: `Bearer ${user?.accessToken}` }
  );

  alert('Successfully posted');
  setTimeout(() => (window.location.href = '/index.html'), 3000);
}
