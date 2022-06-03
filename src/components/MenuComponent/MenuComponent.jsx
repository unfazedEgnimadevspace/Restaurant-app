import React, {useState } from 'react'
import {IoFastFood} from 'react-icons/io5';
import { categories } from '../data';
import {motion} from 'framer-motion';
import RowContainer from '../RowContainer/Row-Container';
import { useStateValue } from '../../context/stateProvider';
const MenuComponent = () => {
   const [filter ,setFilter] = useState("chicken");
  const [{foodItems, dispatch}] = useStateValue()
  return (
    <section className='w-full my-6' id='menu'>
         <div className='w-full flex flex-col items-center justify-center'>
         <p className='text-2xl font-semibold uppercase relative text-headingColor  mr-auto before:absolute before:rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 left-0 before:bg-gradient-to-tr from-orange-400 to-orange-500  transition-all ease-in-out duration-100 pt-5
            '>
                Our Hot Dishes
            </p>

            <div className='w-full  flex items-center justify-start lg:justify-center gap-8 overflow-x-scroll py-6 scrollbar-none'>
                {
                  categories && categories.map((category => (
                    <motion.div  whileTap={{
                      scale:0.75
                    }}
                     key={category.id} className={`group ${filter === category.urlParamName ? "bg-cartNumBg" : 'bg-white'} w-24 min-w-[94px] hover:bg-cartNumBg bg h-28 cursor-pointer rounded-lg drop-shadow-xl  flex flex-col gap-3 items-center justify-center`} onClick={() => setFilter(category.urlParamName)} >
                    <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-white' : 'bg-cartNumBg' } group-hover:bg-card  flex items-center justify-center`}>
                        <IoFastFood  className={`${filter === category.urlParamName ?  "text-textColor" : "text-white"} group-hover:text-textColor text-lg shadow-lg`}/>
                    </div>
                    <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor' } group-hover:text-white`}>{category.name}</p>
                 </motion.div>
                  )))
                }
            </div>

            <div className='w-full '>
               <RowContainer flag={false}  data={foodItems?.filter(n => n.category === filter)} /> 
            </div>
         </div>
    </section>
  )
}

export default MenuComponent