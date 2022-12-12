export default function Seller(seller) {
	return `
  <h1 class='mb-2'>Seller</h1>
   <div class='flex items-center gap-2'>

      <img src='${
				seller?.avatar ||
				'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
			}' class='w-[40px] h-[40px] rounded-full object-cover' />
      <span>${seller?.name}</span>
   </div>
   `;
}
