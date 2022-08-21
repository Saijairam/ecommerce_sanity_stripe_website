import React,{useContext,createContext,useState,useEffect, Profiler} from "react";

import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({children})=>{
    const [showCart, setshowCart] = useState(false);
    const [cartItems, setcartItems] = useState([]);
    const [totalPrice, settotalPrice] = useState(0);
    const [totalQuanities, settotalQuanities] = useState(0);
    const [qty, setqty] = useState(1);

    let foundProduct;
    let index;

    //tougher logic -> cart logic 
    const addcart = (product,quantity)=>{
        const checkProductInCart = cartItems.find((item)=>item._id===product._id);

        settotalPrice((prevtotalPrice)=> prevtotalPrice + product.price*quantity );
        settotalQuanities((prevQuantities) => prevQuantities + quantity);

        if(checkProductInCart){ 
            const updatedCartitems = cartItems.map((cartProduct)=>{
            if(cartProduct._id===product._id){
                return {...cartProduct,quantity:cartProduct.quantity+quantity}
            }
        });
        setcartItems(updatedCartitems);        
        }else{
           product.quantity = quantity;
           setcartItems([...cartItems,{...product}]);
        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product)=>{
        foundProduct = cartItems.find((item)=>item._id===product._id);
        const newCartItems = cartItems.filter((item)=>item._id!=product._id);

        settotalPrice((prevtotalPrice)=> prevtotalPrice - foundProduct.price * foundProduct.quantity);
        settotalQuanities((prevQuantities)=>prevQuantities - foundProduct.quantity);
        setcartItems(newCartItems);
    }

    const toggleCartItemQty = (id,value)=>{
        
       foundProduct = cartItems.find((item)=>item._id===id);
       index = cartItems.findIndex((product)=>product._id===id);
    //    const newCartItems = cartItems.splice(index,1); use filter method
       const newCartItems = cartItems.filter((item)=>item._id!=id);
       if(value=="inc"){
        setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]);
        settotalPrice(prevtotalPrice=>prevtotalPrice+foundProduct.price);
        settotalQuanities(prevQuantities=>prevQuantities+1);
        //  foundProduct.quantity+=1;
        //  cartItems[index] = foundProduct; ->we should never do like this because react state is mutable, we should not change like this 
       }else if(value=="dec"){
        if(foundProduct.quantity > 1){
            setcartItems([...newCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]);
            settotalPrice(prevtotalPrice=>prevtotalPrice-foundProduct.price);
            settotalQuanities(prevQuantities=>prevQuantities-1); 
        }
       }
    }

    const incqty = ()=>{
        setqty((prevqty)=>prevqty+1);
    }
    const decqty = ()=>{
        setqty((prevqty)=>{
            if(prevqty-1<1) return 1;
            return prevqty-1 ;   
        }
        );
    }

    return (
        <Context.Provider value={{showCart,cartItems,totalPrice,totalQuanities,qty,incqty,decqty,addcart,setshowCart,toggleCartItemQty,onRemove,setcartItems,settotalPrice,settotalQuanities}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = ()=> useContext(Context); //Imp step which can grab data easily like hook