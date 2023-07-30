import { Router } from "express";
import upload from 'express-fileupload'
import { Blog } from "../models/blog.js";
const router = Router()
router.use(upload())
router.post('/create', async (req, res) => {
  const { title, body,user } = req.body
  const fileObject=req.files
  if (!title || !body || !user || !fileObject) return res.status(404).json({ message: "Please fill all the fields" })
  const fileKey = Object.keys(fileObject)[0];
  const file= fileObject[fileKey];
  const name = fileObject[fileKey].name;
  file.mv('/frontend/public/'+name,async function(err){
    // ^ /React Projects/mern-project/blog-app/frontend/public/
    if(err){
      console.log(err);
    }else{
      await Blog.create({
        title,
        body,
        createdBy:`${user}`,
        coverImageURL:`${name}`,
      })
      res.status(200).json({ message: "Blog is created successfully" })
    }
  })
})
router.get('/get',async(req,res)=>{
  const blogPost=await Blog.find({})
  res.status(200).json(blogPost)
})

export default router