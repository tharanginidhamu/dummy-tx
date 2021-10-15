import jwt from 'jsonwebtoken';

function auth(req, res, next){

    if(!req.headers["authorization"]){
        res.send({msg:"Authorisation token is needed"})
    }else{
 let token = req.headers["authorization"];

 token = token.split(" ")[1];
    
 jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
     if(!err){
         req.user = user;
         next();
     }else {
         return res.status(403).json({msg:"User not authenticated"})
     }
 })
}
}
export default auth;

