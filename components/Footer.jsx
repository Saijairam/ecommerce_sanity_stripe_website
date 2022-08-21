import React from 'react'
import {AiFillInstagram , AiOutlineTwitter} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>SJR HEADPHONES &copy; 2022 . All rights are reserved for this website.</p>
      <p className='icons'>
        <AiFillInstagram/>
        <AiOutlineTwitter/>
      </p>
    </div>
  )
}

export default Footer