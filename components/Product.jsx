import React from 'react';

import Link  from 'next/link.js';
import { urlFor } from '../lib/client';

const Product = ({product:{image,name,price,slug}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
           <img src={urlFor(image && image[0])} width={250} alt=".." height={250} className='product-image'/>
           <p className='product-name'>{name}</p>
           <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product