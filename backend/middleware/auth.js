import jwt from "jsonwebtoken"

const auth = (req,res,next) =>{
    const {token} = req.headers;
    if(!token){
        return res.json({success : false, message : "Not Logged In"});
    }
    try{
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        next();
    }
    catch(err){
        console.log(err);
        res.json({success:false, message:"Error"});
    }
}

export default auth;
