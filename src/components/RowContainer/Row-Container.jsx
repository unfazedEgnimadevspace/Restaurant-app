import React from 'react'
import Rice from '../../assets/Food App Images/r1.png';
import { MdShoppingBasket } from 'react-icons/md';
import { motion } from 'framer-motion';
const RowContainer = ({flag, data}) => {
    console.log(data)
  return (
    <div className={`w-full my-12 ${flag ? "overflow-x-scroll" : "overflow-x-hidden"} `}
    >
      <div className=' w-300 md:w-340 my-12 h-auto bg-cardOverlay rounded-lg p-2 backdrop-blur-lg hover:drop-shadow-2xl hover:cursor-pointer'>
          <div className='w-full flex items-center justify-between mt-2'>
             <motion.img whileHover={{
                 scale: 1.2
             }} src={Rice} alt="rice1"  className='w-40 -mt-8 drop-shadow-2xl'/>
             <motion.div  whileTap={{
                 scale:0.75
             }} className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'>
              <MdShoppingBasket  className='text-white ' />
             </motion.div>
          </div>
          <div className='w-full flex flex-col  items-end justify-end '>
             <p className='text-textColor font-semibold text-base md:text-lg'>Chocolate & Vanilla</p>
             <p className='mt-1 text-sm text-gray-500'>45  Calories</p>
             <div className='flex items-center gap-8'>
               <p className='text-lg text-headingColorColor font-semibold'>
                   <span className='text-red-500'>$</span>
                   5.25
                </p>

             </div>
          </div>
      </div>
    </div>
  )
}
 
export default RowContainer