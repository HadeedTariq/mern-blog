import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeData } from '../store/reducers/reducers'

function NavBar() {
  const dispatch=useDispatch()
  const { userData } = useSelector((state) => state.user)
  const navigate=useNavigate()
  const logout=()=>{
    dispatch(removeData())
    navigate('/auth')
  }
  return (
    <nav className='flex justify-between items-center w-full py-2 px-3 bg-emerald-600'>
      <Link to={'/'} className='no-underline text-orange-600'><h3 className='text-xl font-extrabold'>Blogify</h3></Link>
      {!userData &&<ul className='flex items-center gap-4'>
         <Link to={'/auth'} className='no-underline text-white'><li className='text-lg font-semibold'>Login</li></Link>
         <Link to={'/register'} className='no-underline text-white'><li className='text-lg  font-semibold'>Signup</li></Link>
      </ul>}
      {userData &&<ul className='flex items-center gap-4'>
         <p className='text-xl font-bold text-amber-500'>{userData.fullName}</p>
         <button className='bg-red-700 text-base font-bold py-0.5 px-3 rounded-md' onClick={logout}>Logout</button>
         <Link to={'/addBlog'} className='no-underline text-white'><p className='text-lg font-semibold mx-1'>Add Blog</p></Link>
      </ul>}
    </nav>
  )
}

export default NavBar