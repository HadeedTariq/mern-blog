import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setBlogs } from "../store/reducers/reducers"
function Home() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {blogPosts:blogs}=useSelector((state)=>state.user)
  const singleBlog=(id)=>{
    navigate(`/blog/${id}`)
  }
  useEffect(() => {
    const fetchBlogs=async()=>{
      const {data}=await axios.get(`${import.meta.env.VITE_DOMAIN}/blog/get`)
      dispatch(setBlogs(data))
    }
    fetchBlogs()
  }, [])
  
  return (
    <div className="flex w-full flex-wrap py-2 px-5 gap-3">
      {blogs && blogs.map(blog=>
          <div key={blog._id} className="flex flex-col w-72 m-3 h-96 py-1 px-2 border border-white rounded-sm gap-2">
            <img src={`/${blog.coverImageURL}`}  className="w-full h-36 object-cover"/>
            <p className="font-extrabold text-lg my-1">{blog.title}</p>
            <p className="text-lg font-semibold my-1">{blog.body.slice(0,100)}...</p>
            <button className="text-base font-bold py-0.5 px-3 bg-orange-500 my-1 mx-auto  cursor-pointer rounded-md" onClick={()=>singleBlog(blog._id)}>Show More</button>
          </div>
        )}
    </div>
  )
}

export default Home