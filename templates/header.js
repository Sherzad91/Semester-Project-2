import { getUser } from '../scripts/common.js';

export default function Header() {
	const user = getUser();

	return `
  <header>
  <div class='container flex flex-col gap-8 md:flex-row md:gap-0 items-center justify-between py-6'>

  <div class='flex flex-col md:flex-row items-center gap-7'>
    <h1 class='text-3xl font-extrabold bg-gradient-to-r from-rose-400 to-red-500 text-transparent bg-clip-text'>
      <a href='/index.html'>
      Auction Bids
      </a>
    </h1>
    <a href='/index.html' class='font-semibold hover:text-red-500'>Home</a>

    ${
			user
				? `
          <!--<a href='/my-listings.html' class='font-semibold hover:text-red-500'>My Listings</a>-->
          <a href='/add-listing.html' class='font-semibold hover:text-red-500'>Add Listing</a>
          <a href='/my-listings.html' class='font-semibold hover:text-red-500'>My Listings</a>
          <a href='/logout.html' class='font-semibold hover:text-red-500 cursor-pointer'>Logout</a>
        `
				: ''
		}
    
  </div>

  ${
		user
			? `
      <div class='flex items-center gap-4'>
        <span class='bg-gradient-to-r drop-shadow-md from-green-500 text-white to-green-600 font-bold px-2 py-1 rounded-md border border-green-700 shadow-md'>
          ${user?.credits}$
        </span>
        <div id='change-avatar' class='inline-flex items-center gap-2 group cursor-pointer'>
            <img src='${
							user?.avatar ||
							'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
						}' alt='User Avatar' class='border-red-500 border-2 rounded-full shadow-md w-[40px] h-[40px]'  />

            <div class='inline-flex flex-col'>
                <span>${user?.name}</span>
                <span class='text-xs group-hover:underline text-gray-500'>Change avatar</span>
            </div>
        </div>
      </div>
      `
			: `
    <div class='flex items-center gap-4'>
      <a href='/login.html' class='btn'>Login</a>
      <a href='/register.html' class='text-red-500'>Register</a>
    </div>
    `
	}

  </div>

  </header>
   `;
}
