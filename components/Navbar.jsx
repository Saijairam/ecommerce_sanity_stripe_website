import React, { useState } from 'react';

import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';

import {Cart} from './';

import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const {showCart,setshowCart,totalQuanities} = useStateContext();
  return (
    <div className='navbar-container'>
       <p className='logo'>
        <Link href='/'>SJR Headphones</Link>
       </p>
       <button type='button' className='cart-icon' onClick={()=>setshowCart(true)}>
          <AiOutlineShopping/><span className='card-item-qty'>{totalQuanities}</span>
       </button>
       {showCart && <Cart/>}
    </div>
  )
}

export default Navbar