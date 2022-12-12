import { changeAvatar, getUser, insertCommonHead, insertHeader } from '../scripts/common.js';
import { Delete, get } from '../scripts/requests.js';
import ListingCard from '../templates/listing.js';

const listingsGrid = document.getElementById('listings-grid');
document.addEventListener('DOMContentLoaded', async function (e) {
	insertCommonHead('My Listings');
	insertHeader();

	await renderListings();
	document.getElementById('change-avatar').addEventListener('click', changeAvatar);

	document.querySelectorAll('.delete-my-listing').forEach((el) => {
		el.addEventListener('click', function (e) {
			handleDeleteListing(el.dataset.id);
		});
	});
});

async function renderListings() {
	const user = getUser();
	if (!user) return (window.location.href = '/login.html');

	const data = await get('/profiles/' + user.name + '/listings?_seller=true&sort=created&sortOrder=desc', {
		Authorization: 'Bearer ' + user.accessToken,
	});
	if (!data) return;

	data?.forEach((listing) => listingsGrid.insertAdjacentHTML('beforeend', ListingCard(listing, true)));
}

async function handleDeleteListing(id) {
	const user = getUser();
	if (confirm('Are you sure you want to delete this listing?')) {
		await Delete('/listings/' + id, { Authorization: 'Bearer ' + user.accessToken });

		return window.location.reload();
	}
}
