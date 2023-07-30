import jwt from "jsonwebtoken";

const secret="hadeed@1234567890";

export const createTokenForUser=(user)=>{
    const payload={
        _id:user._id,
        email:user.email,
        role:user.role,
        fullName:user.fullName
    }
    const token=jwt.sign(payload,secret)
    return token
}
export const verifyToken=(token)=>{
    const payload=jwt.verify(token,secret)
    return payload
}