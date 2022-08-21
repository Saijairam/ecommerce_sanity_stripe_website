import React,{useState} from 'react';

import {client,urlFor} from '../../lib/client';

import {useStateContext} from '../../context/StateContext'

import {AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar} from 'react-icons/ai';
import Product from '../../components/Product';

const ProductDetails = ({products,product}) => {
    const {image,name,details,price} = product;
    const [index,setindex] = useState(0); 
    const {decqty,incqty,qty,addcart,setshowCart} = useStateContext();

    const handleBuynow = ()=>{
      addcart(product,qty);
      setshowCart(true);
    }
  return (
    <div>
        <div className='product-detail-container'>
          <div>
            <div className='image-container'>
              <img src={urlFor(image && image[index])} className='product-detail-image'/>
            </div>
            <div className='small-images-container'>
               {image?.map((item,i)=>(
                <img src={urlFor(item)} className={i===index? "small-image selected-image":"small-image"} onMouseEnter={()=>setindex(i)} key={i}/>
               ))}
            </div>
          </div>
          <div className='product-detail-desc'>
             <h1>{name}</h1>
             <div className='reviews'>
               <div>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiFillStar/>
                <AiOutlineStar/>
               </div>
               <p>(20)</p>              
             </div>
             <h4>Details:</h4>
             <p>{details}</p>
             <p className='price'>${price}</p>
             <div className='quantity'>
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decqty}><AiOutlineMinus/></span>
                    <span className='num'>{qty}</span>
                    <span className='plus' onClick={incqty}><AiOutlinePlus/></span>
                </p>
             </div>
             <div className='buttons'>
               <button type='button' className='add-to-cart' onClick={()=>addcart(product,qty)}>Add to Cart</button>
               <button type='button' className='buy-now' onClick={handleBuynow} >BUY NOW </button>
             </div>
          </div>
        </div>
        <div className='maylike-products-wrapper'>
          <h2>You may also like this</h2>
          <div className='marquee'>
              <div className='maylike-products-container track'>
                  {products.map((item)=>(<Product key={item._id} product={item}/>))}
              </div>
          </div>
        </div>
    </div>
  )
}

//We are using getstaticprops because if we click on specific product we have to get that particular product details
// on before hand, so this is perfect example for getstaticprops

//If we use getStaticprops , we have to use getsaticpaths..

export const getStaticPaths = async () =>{
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

    const products = await client.fetch(query);
    const paths = products.map((product)=>({
        params:{
            slug : product.slug.current
        }
    }));

    return {
        paths,
        fallback:'blocking',       
    }
}


export const getStaticProps = async ({params:{slug}})=>{

    const query = `*[ _type == "product" && slug.current == '${slug}'][0]`; //Grab all product field data from sanity client
    const productsquery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsquery);
  
    return {
      props : {products,product}
    }
  }

export default ProductDetails