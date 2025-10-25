import { db } from "../db/db.js";


export async function  middlewhereBan(req,res,next) {


    const {userId} = req.user.id;

    try{

         const [user] =  await db.query("SELECT is_banned FROM users WHERE id = ?",[userId])
    if(user.is_banned) {
        return res.status(403).json({message: `Usted ha sido baneado hasta ${user.ban_fecha}`})
    };
    }catch(err){
        console.error('error interno: ',err)
    }
   

    
    next();
}