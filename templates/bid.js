export default function Bid(bid) {
  return `
      <span class='bg-gray-200 rounded-full px-3 py-1.5 font-semibold'>
         ${bid.bidderName} - ${bid.amount}
      </span>
   `;
}
