import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setData } from '../store/reducers/reducers'
function Form({ login, register, btn }) {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [err,setErr]=useState('')
  const users=useSelector((state)=>state.user.userData)
  const submitForm = async (e, url) => {
    e.preventDefault()
    const form=new FormData(e.currentTarget)
    const datas=Object.fromEntries(form)
    try {
     const {data}= await axios.post(`${import.meta.env.VITE_DOMAIN}/user${url}`,datas)
     if(data){
      dispatch(setData(data))
      navigate('/')
     }
    } catch (error) {
      setErr(error?.response?.data?.message);
    }
  }
  useEffect(()=>{
    if(users)return navigate('/')
  },[])
  return (
    <div className="flex justify-center w-full py-32">
      <form method="post" onSubmit={(e) => submitForm(e, login ? '/signin' : '/signup')} className="flex flex-col w-80 bg-teal-700 py-8 px-5 h-fit gap-1">
        {!login && <label className="text-lg font-semibold my-1">Enter your fullName</label>}
        {!login && <input type="fullName" name="fullName" placeholder="FullName" className="border-none outline-none text-base py-1 px-2 w-full text-black" />}
        <label className="text-lg font-semibold my-1">Enter your email</label>
        <input type="email" name="email" placeholder="Email" className="border-none outline-none text-base py-1 px-2 w-full text-black" />
        <label className="text-lg font-semibold my-1">Enter your password</label>
        <input type="password" name="password" placeholder="Password" className="border-none outline-none text-base py-1 px-2 w-full text-black" />
        {err && <p className='text-pink-600 text-center my-1 font-bold text-lg'>{err}</p>}
        <button type="submit" className="my-1 bg-yellow-600 py-1 px-5 text-lg font-semibold w-fit rounded-md mx-auto">{btn}</button>
      </form>
    </div>
  )
}

export default Form