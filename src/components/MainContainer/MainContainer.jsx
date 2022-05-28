import React from 'react'
import {motion} from 'framer-motion'
import HomeContainer from '../HomeContainer/HomeContainer';
import {MdChevronRight, MdChevronLeft} from 'react-icons/md'
import RowContainer from '../RowContainer/Row-Container';
import { useStateValue } from '../../context/stateProvider';
const MainContainer = () => {
  const [{foodItems}, dispatch] = useStateValue()
  return (
    <div className='w-full h-auto flex flex-col items-center justify-center '>
       <HomeContainer />

       <section className='w-full'>
          <div className='w-full flex items-center justify-between'> 
            <p className='text-2xl font-semibold uppercase relative text-headingColor before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 left-0 before:bg-gradient-to-tr from-orange-400 to-orange-500  transition-all ease-in-out duration-100 pt-5
            '>
                Our fresh & healthy fruits
            </p>
            <div className=' hidden md:flex gap-3 items-center '>
               <motion.div  whileTap={{
                 scale:0.75
               }} className='h-8 w-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg'>
                 <MdChevronLeft className='text-lg text-white' />
               </motion.div>
               <motion.div  whileTap={{
                 scale:1.5
               }} className='h-8 w-8 rounded-lg bg-orange-300 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all ease-in-out duration-100 hover:shadow-lg'>
                 <MdChevronRight className='text-lg text-white ' />
               </motion.div>
            </div> 
          </div>
          <RowContainer flag={true} data={foodItems} />
       </section>
    </div>
  )
}

export default MainContainer;