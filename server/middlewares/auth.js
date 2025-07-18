import jwt from 'jsonwebtoken';

const auth = (req,res,next)=>{

   const token = req.cookies.jwt;

if (!token) {
    return res.status(401).json({ success: false, message: 'No token in cookies' });
}
    const secret=process.env.SECRET_KEY;
    try {
        const decoded = jwt.verify(token,secret)
        req.user =decoded;
        next();
    } catch (error) {

        res.status(401).json({success:false,message:'invalid token'})
        
    }
}

export default auth;