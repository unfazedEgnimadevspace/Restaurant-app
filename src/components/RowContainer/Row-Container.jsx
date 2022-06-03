import React, { useEffect, useRef, useState } from 'react'
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
import  NotFound from '../../assets/Food App Images/NotFound.svg'
import { useStateValue } from '../../context/stateProvider';
import { actionType } from '../../context/reducer'; 

const RowContainer = ({flag, data, scrollVal}) => {
const rowContainer = useRef();
const [Items, setItems] = useState([])

const [{cartItems}, dispatch] = useStateValue();

 useEffect(() => {
      rowContainer.current.scrollLeft += scrollVal
    }, [scrollVal]);
   

const addToCart = () => {
 
  dispatch({
    type: actionType.SET_CART_ITEMS,
    cartItems: Items
  });
  localStorage.setItem("cartItems" , JSON.stringify(Items))
}

useEffect(() => {
   addToCart()
},[Items])
  return (
    <div 
    ref={rowContainer}
    className={`w-full my-12 flex items-center  gap-3  scroll-smooth ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap justify-center h-420"} `}
    >
     {
       data && data.length > 0 ? data.map((n) => (
        <div key={n.id}  className='w-275 h-[175px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative
        '>
        <div className='w-full flex items-center justify-between '>
          <motion.div  whileTap={{
            scale:1.2
          }}
           className='w-40 h-40 -mt-8 drop-shadow-2xl'>
          <img src={n?.imageURL} alt={n?.name}  className='w-full h-full object-contain'/>
          </motion.div>
           <motion.div  whileTap={{
               scale:0.75
           }} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
             onClick={() =>  setItems([...cartItems, n])}           
           >
            <MdShoppingBasket  className='text-white ' />
           </motion.div>
        </div>
        <div className='w-full flex flex-col  items-end justify-end '>
           <p className='text-textColor font-semibold text-base md:text-lg'>{n?.title}</p>
           <p className='mt-1 text-sm text-gray-500'>{n?.calories} Calories</p>
           <div className='flex items-center gap-8'>
             <p className='text-lg text-headingColorColor font-semibold'>
                 <span className='text-red-500'>$</span>
                 {n?.price}
              </p>
    
           </div>
        </div>
    </div>
       ))
       :
      ( <div className='w-full flex flex-col gap-4 items-center justify-center'>
         <img src={NotFound} alt="asset not found"  className='h-340'/>
         <p className='text-xl text-headingColor font-semibold'>Items Not Available</p>
       </div>)
     }
    </div>
  )
}
 
export default RowContainer