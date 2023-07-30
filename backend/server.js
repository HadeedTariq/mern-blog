import express from "express";
import { router } from "./routes/userRouter.js";
import dotenv from 'dotenv'
import { connectDb } from "./connection/connectDb.js";
import cookieParser from "cookie-parser";
import path from 'path'
import blogRouter from './routes/blogRouter.js'
import cors from 'cors'
const app=express()
app.use(express.static(path.resolve('../frontend/public')))
dotenv.config()
const PORT=5000;
connectDb().then(()=>console.log('database is connected'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())
app.use('/user',router)
app.use('/blog',blogRouter)
app.listen(PORT,()=>console.log(`App is listening on port: ${PORT}`))
