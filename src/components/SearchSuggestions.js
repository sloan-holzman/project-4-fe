import React from 'react'


const SearchSuggestions = ({...props}) => {
  let coupons = `https://www.coupons.com/coupon-codes/search/?ids=&queryterm=${props.selectedRetailer}`
  let retailmenot = `https://www.retailmenot.com/view/${props.selectedRetailer}.com`
  let raise = `https://www.raise.com/buy-gift-cards?utf8=%E2%9C%93&keywords=${props.selectedRetailer}`
  let googleGiftCards = `https://www.google.com/search?q=${props.selectedRetailer}+discount+gift+cards`
  let googleCoupons = `https://www.google.com/search?q=${props.selectedRetailer}+coupons`
  return (
    <div className="search-links">
      <p>suggested links for finding discount gift cards / coupons for {props.selectedRetailer}...</p>
      <p><a href={coupons} target="_blank" rel="noopener noreferrer">coupons.com</a> | <a href={retailmenot} target="_blank" rel="noopener noreferrer">retailmenot.com</a> | <a href={raise} target="_blank" rel="noopener noreferrer">raise.com</a> | <a href={googleGiftCards} target="_blank" rel="noopener noreferrer">google.com (gift cards)</a> | <a href={googleCoupons} target="_blank" rel="noopener noreferrer">google.com (coupons)</a></p>
      </div>
  )
}


export default SearchSuggestions
