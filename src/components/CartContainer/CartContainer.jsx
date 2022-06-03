import React, {useEffect,useState} from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { motion } from 'framer-motion';
import {RiRefreshFill} from 'react-icons/ri'
import { useStateValue } from '../../context/stateProvider';
import { actionType } from '../../context/reducer';
import EmptyCart from '../../assets/Food App Images/emptyCart.svg';
import CartItems from '../CartItems/CartItems';
import {BsFillCreditCard2FrontFill} from 'react-icons/bs';
import StripeCheckOutButton from '../stripe/stripe';
const CartContainer = () => {
     const [{cartShow,cartItems, user}, dispatch] = useStateValue()
     const [flag, setFlag] = useState(1)
     const [tot,setTot] = useState(0)

     const hideCart = () => {
       dispatch({
         type: actionType.SET_CART_SHOW,
         cartShow: !cartShow
       })
     }

     useEffect(() => {
       let tottalPrice = cartItems.reduce(function(accumulator,item){
         return accumulator + item.qty * item.price;
       },0)
       setTot(tottalPrice)
       console.log(tot);
     },[tot,flag])

     const clearCart = () =>{
       dispatch({
         type: actionType.SET_CART_ITEMS,
         cartItems: []
       })
       localStorage.setItem("cartItems", JSON.stringify([]))
     }

   return (<motion.div initial={{opacity:0, x:200}} animate={{opacity:1,x:0}} exit={{opacity:0, x:200}}
                        
  className=' fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
    <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
         <motion.div 
         whileTap={{
           scale:0.75
         }} initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }}
         onClick={hideCart}
         >
           <MdOutlineKeyboardBackspace  className='text-textColor text-3xl'/> 
           </motion.div> 
           <motion.p initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='text-textColor text-lg font-semibold'>Cart</motion.p>
           <motion.p whileTap={{
             scale: 0.75
           }}  initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }}
            className='flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md  cursor-pointer text-textColor text-base' onClick={clearCart}
           >Clear <RiRefreshFill /> {" "}</motion.p>
    </div>

{/* Bottom Section */}
  {cartItems && cartItems.length > 0 ?(   <div className='w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>
      {/* Cart Item Section */}
       <div className=' w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3  overflow-y-scroll scrollbar-none'>
        {/* CartItem */}
         {
           cartItems && cartItems.map((cartItem) =>(
             <CartItems cartItem={cartItem} key={cartItem.id}  setFlag={setFlag} flag={flag}/>
           ))
         }
       </div>

       {/* Cart Total section */}
       <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2 '>
          <div className='w-full flex items-center justify-between'>
             <p className='text-gray-400 text-lg'> Sub Total</p>
             <p className='text-gray-400 text-lg'> ${tot}</p>
          </div>
          <div className='w-full flex items-center justify-between'>
             <p className='text-gray-400 text-lg'> Delivery</p>
             <p className='text-gray-400 text-lg'>$ 2.5</p>
          </div>
            {/* Divider */}
          <div className='w-full border-b border-gray-600 my-2'></div>
 

           <div className='w-full flex items-center justify-between'>
               <p className='text-gray-200 text-xl font-semibold'>Total</p>
               <p className='text-gray-200 text-xl font-semibold'> ${tot + 2.5}</p>
           </div>
          {
              user ? (
                <motion.button
                whileTap={{scale:0.75}}
                type='button'
                
                
               > 
                  <StripeCheckOutButton price={tot + 2.5} className='bg-orange-400' />
               </motion.button>
              )
              :
              (
                <p               
                className='w-full p-2 rounded-full  text-gray-50 text-lg my-2 hover:shadow-lg text-center'
               > 
                You have to login to see Checkout button
                </p>
              )
          }
        </div>
    </div> )
    :   (
      <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
            <img src={EmptyCart} alt="Empty Cart"  className='w-300'/>
            <p className='text-xl text-textColor font-semibold'>
              Add some items to your cart 
            </p>
      </div>
    )
  }
 
    </motion.div>
  )
}

export default CartContainer