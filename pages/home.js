import { insertHeader, insertCommonHead, changeAvatar } from '../scripts/common.js';
import { get } from '../scripts/requests.js';
import ListingCard from '../templates/listing.js';

const listingsGrid = document.getElementById('listings-grid');

document.addEventListener('DOMContentLoaded', async function (e) {
  insertCommonHead('Home');
  insertHeader();
  await renderListings();
  document.getElementById('change-avatar').addEventListener('click', changeAvatar);
});

async function renderListings() {
  const data = await get('/listings?_seller=true&sort=created&sortOrder=desc');
  if (!data) return;

  data?.forEach((listing) => listingsGrid.insertAdjacentHTML('beforeend', ListingCard(listing)));
}
