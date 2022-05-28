import React from 'react'
import Delivery from '../../assets/Food App Images/delivery.png';
import Logo2 from '../../assets/Food App Images/heroBg.png'
import { heroData } from '../data';

const HomeContainer = () => {
  return (
    <section className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full  overflow-x-hidden' id='home'>
      <div className='py-2  flex-1 flex flex-col items-start  justify-center gap-6'>
        <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full '> 
          <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
          <div className='w-8, h-8 rounded-full overflow-hidden drop-shadow-xl'>
            <img src={Delivery} alt="delivery" className='w-full h-full object-contain bg-white'  />
            </div>
          </div>

          <p
          className='text-[3rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor'> The Fatest Delivery in<span className='text-orange-600 text-[3rem] md:text-[5rem]'>Your City</span></p>
         <p>
         <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore excepturi beatae pariatur ducimus dolorem provident sapiente exercitationem ullam unde quae libero ex, quam animi adipisci perferendis sint suscipit neque mollitia?</p>
         </p>

         <button type='button' className='bg-gradient-to-br from-orange-400 to-orange-500 font-normal  w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100'>
            Order Now
         </button>
      </div>
      
       <div className='py-2 flex-1 flex items-center relative'>
        
       <img src={Logo2} alt="hero-bg"  className='ml-auto h-420 w-full lg:w-auto lg:h-650'/>
       
    
      <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center md:justify-start py-4 xl:px-32  gap-6 flex-wrap'>
        {
          heroData.map((n) => ( <div  key= {n.id} className=' lg:w-190  p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg '>
         <img src={n.imageSrc} alt="I1" className='w-20 lg:w-40 -mt-10 lg:-mt-20'/>
         <p className='text-base  lg:text-xl font-semibold text-textColor mt-2 lg:mt-4'> {n.name} </p>
         <p className=' text-[12px] lg:text-sm text-lighttextgray font-semibold my-1 lg:my-3'>
           {n.decp}
           </p>         
           <p className='text-sm font-semibold text-headingColor'><span className='text-xs text-red-600'>$</span>{n.price} </p>
      </div>))
}
   </div>  
  </div>
     
    </section>
  )
}

export default HomeContainer;