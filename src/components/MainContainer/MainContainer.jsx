import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import HomeContainer from '../HomeContainer/HomeContainer';
import {MdChevronRight, MdChevronLeft} from 'react-icons/md'
import RowContainer from '../RowContainer/Row-Container';
import { useStateValue } from '../../context/stateProvider';
import MenuComponent from '../MenuComponent/MenuComponent';
import CartContainer from '../CartContainer/CartContainer';
const MainContainer = () => {
  const [{foodItems, cartShow}, dispatch] = useStateValue();
  const [scrollVal, setScrollVal] = useState(0)
 useEffect(() => {
   
 }, [scrollVal,cartShow])

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center '>
       <HomeContainer />

       <section className='w-full my-6'>
          <div className='w-full flex items-center justify-between'> 
            <p className='text-2xl font-semibold uppercase relative text-headingColor before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 left-0 before:bg-gradient-to-tr from-orange-400 to-orange-500  transition-all ease-in-out duration-100 pt-5
            '>
                Our fresh & healthy fruits
            </p>
            <div className=' hidden md:flex gap-3 items-center '>
               <motion.div  whileTap={{
                 scale:0.75
               }} className='h-8 w-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer  hover:shadow-lg'
                onClick={() => setScrollVal(scrollVal -100)}
               >
                 <MdChevronLeft className='text-lg text-white' />
               </motion.div>
               <motion.div  whileTap={{
                 scale:1.5
               }} className='h-8 w-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer  hover:shadow-lg'
               onClick={() => setScrollVal(scrollVal + 100)}
               >
                 <MdChevronRight className='text-lg text-white ' />
               </motion.div>
            </div> 
          </div>
          <RowContainer 
           scrollVal={scrollVal}
          flag={true} data={foodItems?.filter((n) => n.category === "fruits")} />
       </section>

      <MenuComponent />
      {cartShow &&(
        <CartContainer />
      )}
    </div>
  )
}

export default MainContainer;