import { API_URL, changeAvatar, getUser, insertCommonHead, insertHeader } from '../scripts/common.js';
import { get, post } from '../scripts/requests.js';
import Bid from '../templates/bid.js';
import Seller from '../templates/seller.js';
import Tag from '../templates/tag.js';

const title = document.getElementById('title');
const image = document.getElementById('image');
const description = document.getElementById('description');
const bids = document.getElementById('bids');
const bidInput = document.getElementById('bid');
const tags = document.getElementById('tags');
const gallery = document.getElementById('gallery');
const seller = document.getElementById('seller');
const form = document.getElementById('bid-form');
const countDownElement = document.getElementById('countdown');
let countDown;

document.addEventListener('DOMContentLoaded', async function () {
	insertCommonHead('Listing Details');
	insertHeader();

	await getListingDetails();
	document.getElementById('change-avatar').addEventListener('click', changeAvatar);
});

form.addEventListener('submit', async function (e) {
	e.preventDefault();

	const formData = new FormData(form);
	await handleBid(formData.get('amount'));
});

async function getListingDetails() {
	const id = new URLSearchParams(window.location.search).get('id');
	const data = await get(`/listings/${id}?_seller=true&_bids=true`);
	if (!data) return;

	title.innerHTML = data?.title;
	description.innerHTML = data?.description;
	image.src = data?.media[0];
	data?.bids.forEach((bid) => {
		bids.insertAdjacentHTML('afterend', Bid(bid));
	});

	data?.tags?.forEach((tag) => tags.insertAdjacentHTML('afterend', Tag(tag)));

	seller.insertAdjacentHTML('afterbegin', Seller(data?.seller));
	createCountDown(data?.endsAt);

	data?.media?.map((image) => (gallery.innerHTML += `<img src='${image}' class='w-full rounded-md' />`));
}

async function handleBid(amount) {
	if (isNaN(amount) && Number(amount) <= 0) {
		return alert('Invalid amount: must be a positive number greater than 0');
	}

	amount = Number(amount);

	const id = new URLSearchParams(window.location.search).get('id');

	const user = getUser();
	if (!user) return (window.location.href = '/login.html');
	const data = await post(
		`/listings/${id}/bids`,
		{ amount },
		{
			Authorization: 'Bearer ' + user?.accessToken,
		}
	);

	if (!data) return;

	window.location.reload();
}

function createCountDown(endsAt) {
	countDown = new Date(endsAt).getTime();

	calculateRemainingTime();

	setInterval(function () {
		calculateRemainingTime();
	}, 1000);
}

function calculateRemainingTime() {
	let now = new Date().getTime();
	let distance = countDown - now;

	let days = Math.floor(distance / (1000 * 60 * 60 * 24));
	let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((distance % (1000 * 60)) / 1000);

	countDownElement.innerHTML = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ' + 'left';

	if (distance < 0) {
		countDownElement.innerHTML = 'Auction has ended';
	}
}