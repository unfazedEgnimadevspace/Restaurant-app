import React, {useState} from 'react'
import {motion} from 'framer-motion';
import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney} from 'react-icons/md'
import { categories } from '../data';
import Loader from '../Loader/loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../firebase.config';
import { saveItem } from '../../utils/firebase-functions';
import { useStateValue } from '../../context/stateProvider';
import { getAllFoodItem } from '../../utils/firebase-functions';
import { actionType } from '../../context/reducer';
const CreateContainer = () => {
   const [title, setTitle] = useState("");
   const [fields,setFields] = useState(false);
   const [category,setCategory] = useState(null);
   const [price,setPrice] = useState("");
   const [calories,setCalories] = useState("")
   const [alertStatus,setAlertStatus] = useState('dangers')
   const [msg,setMsg] = useState(null);
   const [isLoading, setIsLoading ] = useState(false);
   const [imageAsset, setImageAsset] = useState(null);
   const [{ foodItems }, dispatch] = useStateValue();

   const uploadImage = (e) => {
     setIsLoading(true);
     const imageFile = e.target.files[0];
      const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name} }`) ;
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed', (snapshot) =>{
        const uploadProgress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
      }, (error) => {
        console.log(error);
        setFields(true);
        setMsg('Error while Uploading: Try Again 😢 ');
        setAlertStatus('danger');
        setTimeout(() =>{
          setFields(false)
          setIsLoading(false)
        }, 5000);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
           setImageAsset(downloadURL)
           setIsLoading(false)
           setFields(true)
           setMsg('Image uploaded sucessfully 👌')
           setAlertStatus('sucess')
           setTimeout(() => {
             setFields(false)
           },4000)
        })
      })
   };
   const deleteImage = () => {
     setIsLoading(true);
     const deletedRef = ref(storage, imageAsset);
     deleteObject(deletedRef).then(() => {
       setImageAsset(null);
       setIsLoading(false);
       setFields(true)
       setMsg('Image deleted sucessfully')
       setAlertStatus(' Success')
       setTimeout(() => {
         setFields(false);
       }, 4000);
     });
  };
  const  saveDetails = () => {
   setIsLoading(true)
    try {
      if (!title || !calories || !imageAsset || !price || !category) {
      setFields(true);
      setMsg('Required fields cannot be empty');
      setAlertStatus('danger');
      setTimeout(() =>{
        setFields(false)
        setIsLoading(false)
      }, 5000);
      }
      else{
        const data = {
          id: `${Date.now()}`,
          title : title,
          imageURL : imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price:price
        };
        saveItem(data)
        setIsLoading(false);
        setFields(true);
        setMsg('Data uploaded sucessfully');
        setAlertStatus('sucess');
        setTimeout(() => {
          setFields(false)
        }, 4000);
        clearData();
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg('Error while Uploading: Try Again 😢 ');
      setAlertStatus('danger');
      setTimeout(() =>{
        setFields(false)
        setIsLoading(false)
      }, 5000);
    }
    fetchData();
  };
  const clearData = () =>{
    setTitle("")
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCategory("Select Category")
  };
  const fetchData = async () => {
    await getAllFoodItem().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
          {
            fields &&(
              <motion.p  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === 'danger' ? 'bg-red-400 text-red-600' : 'bg-emerald-400 text-emerald-800 '}`}>
                {msg}
                </motion.p>
            )
          }

          <div className='w-full py-2 border-b flex items-center border-gray-300 gap-2'>
            <MdFastfood  className='text-xl text-gray-700'/>
            <input type="text" required value={title} placeholder="Give me a title" className='w-full h-full text-lg bg-transparent  outline-none border-none placeholder:text-gray-400 text-textColor'onChange={(e) =>setTitle(e.target.value) } />
          </div>
          <div className='w-full '>
            <select onChange={(e) => setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer '>
              <option value="others" className='bg-white'>Select Category</option>
              {categories && categories.map((item) => (
                <option key={item.id} className='textbase border-0 outline-none capitalize bg-white text-headingColor my-4' value={item.urlParamName}  >
                   {item.name}
                </option>
                
              ) )}
            </select>
          </div>

          <div className='group flex  justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
              {isLoading ? <Loader />  : <>
                {
                  !imageAsset ? (
                  <>
                  <label className='w-full h-full justify-center flex flex-col  cursor-pointer items-center'>
                    <div className='w-full h-full justify-center flex flex-col items-center gap-2'>
                     <MdCloudUpload  className='text-gray-500 text-3xl hover:text-gray-700'/>
                     <p className='text-gray-500  hover:text-gray-700'>
                       Click here to Upload
                     </p>
                    </div>
                    <input type="file" name='uploadImage' accept='image/*' onChange={uploadImage} className='w-0 h-0' />
                  </label>
                  </>)
                  :
                  <>
                  <div className='relative h-full '>
                     <img src={imageAsset} alt="assets" className='w-full h-full object-cover'/> 
                     <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 cursor-pointer outline-none hover:shadow-lg duration-100 transition-all ease-in-out' onClick={deleteImage}>
                        <MdDelete className='text-white'/>
                     </button>
                  </div>
                  </>
                }
              </>}
          </div>
          <div className='w-full flex flex-col md:flex-row items-center gap-3'>
              <div className='w-full py-2 border-b  border-gray-300 flex gap-2'>
                 <MdFoodBank  className='text-gray-700 text-2xl '/>
                 <input type="text" required placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 ' onChange={(e) => {setCalories(e.target.value)}} value={calories} />
              </div> 
              <div className='w-full py-2 border-b  border-gray-300 flex gap-2'>
                 <MdAttachMoney  className='text-gray-700 text-2xl '/>
                 <input type="text" required placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 ' value={price} onChange={(e) => {setPrice(e.target.value)}} />
              </div> 
          </div>
          <div className='flex items-center w-full h-full'>
            <button type='button' className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold hover:bg-emerald-700' onClick={saveDetails}>
              Save
            </button>
          </div>
      </div>
    </div>
  )
}

export default CreateContainer