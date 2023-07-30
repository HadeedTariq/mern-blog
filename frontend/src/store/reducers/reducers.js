import {createSlice} from '@reduxjs/toolkit'

const blogUser=JSON.parse(localStorage.getItem('blog-user'))
const initialState={
    userData:blogUser?blogUser:null,
    blogPosts:[],
    singleBlog:null
}
const userRducer=createSlice({
    name:"blogify",
    initialState,
    reducers:{
        setData:(state,{payload})=>{
            state.userData=payload
            localStorage.setItem('blog-user',JSON.stringify(payload))
        },
        removeData:(state)=>{
            state.userData=null;
            localStorage.removeItem('blog-user')
        },
        setBlogs:(state,{payload})=>{
            state.blogPosts=payload
        },
        getSingleBlog:(state,{payload})=>{
            const single=state.blogPosts.find(blog=>blog._id===payload)
            state.singleBlog=single
        }
    }
})
export const{setData,removeData,setBlogs,getSingleBlog}=userRducer.actions;
export default userRducer.reducer;