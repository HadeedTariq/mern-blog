import mongoose from "mongoose";
import {createHmac,randomBytes} from 'crypto'
import { createTokenForUser } from "../services/auth.js";
const {Schema}=mongoose;
const {model}=mongoose
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   salt:{
        type:String
    },
   password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['USER','ADMIN']
    }
})
userSchema.pre('save',function(next){
    const user=this;
    if(!user.isModified('password')) return;
    const salt=randomBytes(16).toString()
    const hashedPassword=createHmac('sha256',salt)
    .update(user.password)
    .digest('hex')
    user.salt=salt;
    user.password=hashedPassword;
    next()
})
userSchema.static("matchPassword",async function(email,password){
    const user=await this.findOne({email});
    if(!user)  throw new Error('User not found');
    const salt=user.salt;
    const hashedPassword=user.password;
    const userProvidedHash=createHmac('sha256',salt)
    .update(password)
    .digest('hex')
    if(userProvidedHash===hashedPassword){
    // return {...user._doc,password:undefined,salt:undefined}
     const token=createTokenForUser(user)
     return token
    }
    else{
        return false
    }
})
const User=model('user',userSchema)
export {User}