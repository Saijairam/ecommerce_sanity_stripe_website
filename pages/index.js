import React from 'react'
import {client} from '../lib/client.js';
import { HeroBanner, FooterBanner , Product  } from '../components';

const Home = ({products,banner}) => {
  return (
    <>
     <HeroBanner heroBanner={banner.length && banner[0]}/>
      {/* {console.log(banner)} */}
      <div className='products-heading'>
        <h2 >Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className='products-container'>
        {products?.map((product)=><Product key={product._id} product={product}/>)}
      </div>

      <FooterBanner footerBanner={banner && banner[0]}/>
    </>
  )
}

//In react we use useEffect to collect data , In nextjs we use getserversideprops func to fetch data..

export const getServerSideProps = async ()=>{
  const query = '*[ _type == "product"]'; //Grab all product field data from sanity client
  const products = await client.fetch(query);

  const Bannerquery = '*[ _type == "banner"]'; //Grab all product field data from sanity client
  const banner = await client.fetch(Bannerquery);

  return {
    props : {products,banner}
  }
}

export default Home;