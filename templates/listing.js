export default function ListingCard(listing, withDelete = false) {
	return `
   <div class='border border-gray-300 rounded-md shadow-md transition hover:shadow-xl'>

   
      <a href='/listing.html?id=${listing?.id}'>
         <div class='flex flex-col gap-2'>
            <img src='${
							listing?.media?.[0] ||
							'https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png'
						}' class='rounded-md rounded-b-none h-[300px] sm:h-[360px] md:h-[200px] lg:h-[250px] object-cover'/>

            <h1 class='px-3 font-bold'>${listing?.title}</h1>

            <div class='inline-flex items-center gap-2 px-3 pb-2'>
               <img src='${
									listing?.seller?.avatar ||
									'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
								}' class='w-[35px] h-[35px] object-cover rounded-full' />

               <div class='inline-flex flex-col'>
                     <span>${listing?.seller?.name}</span>
                     <span class='text-sm font-extrabold text-gray-600'>${listing?._count?.bids} Bids</span>
               </div>


               
            </div>

         </div>
      </a>
${
	withDelete
		? `
   <div class='px-3 pb-1 cursor-pointer delete-my-listing hover:text-red-500' data-id='${listing.id}'>
      Delete
   </div>
`
		: ''
}
 </div>
   `;
}
