import { Router } from "express";
import { User } from '../models/userSchema.js'
import { verifyToken } from "../services/auth.js";
const router = Router()

router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body
    if (!fullName || !password || !email) return res.status(404).json({ message: "Please fill all the fields" })
    try {
        const user = await User.create({
            fullName, email, password
        })
        return res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: "User already existed" })
    }
})
router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    if (!password || !email) return res.status(404).json({ message: "Please fill all the fields" })
    const token = await User.matchPassword(email, password)
    res.cookie("blog",token,{
        maxAge:3600,
        httpOnly:true
    })
    if (!token) return res.status(404).json({ message: "Email or Password incorrect" })
    const user=verifyToken(token)
    return res.status(200).json(user)
})

export { router }