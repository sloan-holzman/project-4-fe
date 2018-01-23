import React from 'react';
import twitter from "../imgs/twitter.png"
import discount from "../imgs/discount.png"
import fireplace from "../imgs/fireplace.png"
import barcode from "../imgs/barcode.png"
import cash from "../imgs/cash.png"
import arrow from "../imgs/arrow.png"
import '../stylesheets/overview.css'


const Overview = ({...props}) => {
  return (
    <div className="overview">
      <div className="overview__set">
        <div className="overview__cell left">log in with your twitter account</div>
        <div className="overview__cell" >
          <img src={twitter}  alt="1. Add weekly goals"/>
        </div>
        <img className="overview__cell arrow" src={arrow}  alt="arrow"/>
      </div>
      <div className="overview__set">
        <div className="overview__cell">save your coupons & gift cards online</div>
        <div className="overview__cell" >
          <img src={discount}  alt="1. Add weekly goals"/>
        </div>
        <img className="overview__cell arrow" src={arrow}  alt="arrow"/>
      </div>
      <div className="overview__set">
        <div className="overview__cell">throw your physical copies in the fire</div>
        <div className="overview__cell" >
          <img src={fireplace}  alt="1. Add weekly goals"/>
        </div>
        <img className="overview__cell arrow" src={arrow}  alt="arrow"/>
      </div>
      <div className="overview__set">
        <div className="overview__cell">scan digital barcodes when shopping</div>
        <div className="overview__cell" >
          <img src={barcode}  alt="1. Add weekly goals"/>
        </div>
        <img className="overview__cell arrow" src={arrow}  alt="arrow"/>
      </div>
      <div className="overview__set">
        <div className="overview__cell">check card balances using links</div>
        <div className="overview__cell right" >
          <img src={cash}  alt="1. Add weekly goals"/>
        </div>
      </div>
    </div>
  )
}


export default Overview
