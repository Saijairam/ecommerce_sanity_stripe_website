import React,{useState,useEffect} from 'react';

import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';

import {useStateContext} from '../context/StateContext';   

import { Fireworks } from '../lib/utils';

const success = () => {
    const {setcartItems,settotalPrice,settotalQuanities} = useStateContext();
    const [order, setorder] = useState(null);

    useEffect(()=>{
        localStorage.clear(); //Clear all data iin localstorage..
        setcartItems([]);
        settotalPrice(0);
        settotalQuanities(0);
        Fireworks();
    },[]);

  return (
    <div className='success-wrapper'>
     <div className='success'>
       <p className='icon'>
        <BsBagCheckFill/>
       </p>
       <h2>Thank you for your order!!</h2>
       <p className='email-msg'>Check your email for receipt.</p>
       <p className='description'>
        If you have any questions, please mail at 
        <a className='email' href='mailto:saijairam473@gmail.com'>saijairam473@gmail.com</a>
       </p>
       <Link href='/'>
        <button type='button' className='btn' width='300px' >Continue your shopping!!</button>
       </Link>
     </div>
    </div>
  )
}

export default success