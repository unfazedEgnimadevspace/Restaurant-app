import React, { useState } from 'react'
import Logo from '../../assets/Food App Images/logo.png';
import { MdShoppingBasket, MdAdd, MdLogout } from 'react-icons/md'
import Avatar from '../../assets/Food App Images/avatar.png';
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '../../firebase.config';
import { useStateValue } from '../../context/stateProvider';
import { actionType } from '../../context/reducer';


const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider()
  const [{ user,cartShow, cartItems }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false)
   const login = async () => {
    if (!user) {
      const { user: { refreshToken, providerData } } = await signInWithPopup(firebaseAuth, provider)
      dispatch(
        {
          type: actionType.SET_USER,
          user: providerData[0],
        })
      localStorage.setItem('user', JSON.stringify(providerData[0]))
    }
    else {
      setIsMenu(!isMenu)
    }

  }
  const logout = () => {
    setIsMenu(false)
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null
    })
  }

const showCart = () => {
  dispatch({
    type: actionType.SET_CART_SHOW,
    cartShow: !cartShow,
  })
}


  return (
    <header className='w-screen z-50 fixed  p-3 px-4 md:p-6  bg-primary ' >
      {/* Desktop and tablets */}
      <div className='hidden md:flex w-full h-full  items-center justify-between
      '>
        <Link to={"/"} className='flex items-center gap-2' onClick={() => setIsMenu(false)}>
          <img src={Logo} alt="Logo" className='w-10 object-cover' />
          <p className='text-headingColor font-bold text-xl'>City </p>
        </Link>
        <div className='flex items-center gap-8'>
          <motion.ul initial={{ opacity: 0, x: 200 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 200 }} className='flex items-center gap-8 '>
            <Link to={"/"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Home</Link>
            <Link to={"/menu"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Menu</Link>
            <Link to={"/aboutus"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>About us</Link>
            <Link to={"/services"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out'>Services</Link>
          </motion.ul>

          <div className='relative flex items-center justify-center ' onClick={showCart}>
            <MdShoppingBasket className='text-textColor  text-2xl  cursor-pointer' />
            {cartItems && cartItems.length > 0 &&(
              <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
              <p className='text-xs  text-white font-semibold'>{cartItems.length}</p>
            </div>
            )}
          </div>
          <div className='relative'>
            <motion.img whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              alt='user picture'
              className='w-10 min-w-[40px] h-10 min-h-[40px]  drop-shadow-2xl hover:cursor-pointer rounded-full'
              onClick={login}
            />
            {
              isMenu && (

                <motion.div
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}

                  className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col  absolute   top-12 right-2'>
                  {
                    user && user.email === "akalugidaniel@gmail.com" && (
                      <Link to={"/createItem"} onClick={() => setIsMenu(false)}> <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base 
            '>New Item  <MdAdd /></p></Link>
                    )
                  }
                  <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base ' onClick={logout}>Logout <MdLogout /></p>
                </motion.div>
              )
            }
          </div>
        </div>
      </div>


      {/* Mobile Phones */}
      <div className='flex items-center justify-between md:hidden w-full h-full '>
        <div className='relative flex items-center justify-center ' onClick={showCart}>
          <MdShoppingBasket className='text-textColor  text-2xl  cursor-pointer'  />
          {
            cartItems && cartItems.length > 0 &&(
              <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
            <p className='text-xs  text-white font-semibold'>{cartItems.length}</p>
          </div>
            )
          }
        </div>
        <Link to={"/"} className='flex items-center gap-2'>
          <img src={Logo} alt="Logo" className='w-10 object-cover' />
          <p className='text-headingColor font-bold text-xl'>City </p>
        </Link>
        <div className='relative'>
          <motion.img whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            alt='user picture'
            className='w-10 min-w-[40px] h-10 min-h-[40px]  drop-shadow-2xl hover:cursor-pointer rounded-full'
            onClick={login}
          />
          {
            isMenu && (

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}

                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col  absolute   top-12 right-2'>
                {
                  user && user.email === "akalugidaniel@gmail.com" && (
                    <Link to={"/createItem"} onClick={() => setIsMenu(false)}> <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base '>New Item  <MdAdd /></p></Link>
                  )
                }
                <ul className='flex flex-col gap-1'>
                  <Link to={"/"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100  transition-all ease-in-out hover:bg-slate-100 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Home</Link>
                  <Link to={"/menu"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Menu</Link>
                  <Link to={"/aboutus"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >About us</Link>
                  <Link to={"/services"} className='text-base text-textColor cursor-pointer hover:text-headingColor duration-100 transition-all ease-in-out hover:bg-slate-100 px-4 py-2'
                    onClick={() => setIsMenu(false)}
                  >Services</Link>
                </ul>

                <p className=' m-2 p-2 rounded-md shadow-md justify-center flex items-center gap-3 cursor-pointer bg-gray-200  hover:bg-gray-300 transition-all duration-400 ease-in-out text-textColor text-base ' onClick={logout}>Logout <MdLogout /></p>
              </motion.div>
            )
          }
        </div>
      </div>
    </header>
  )
}

export default Header ;