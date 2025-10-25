import express, { Router } from 'express';
import { db } from '../db/db.js';


export const adminRoutes = Router();

adminRoutes.get('/', async(req, res) => {

    try {
      const [rows] =  await db.query(`SELECT u.id, u.username,  u.email, u.rol, u.is_banned, u.ban_fecha, COUNT(p.id)  as products_count 
        FROM users u
        LEFT JOIN productos p ON u.id = p.user_id
        GROUP BY u.id, u.username, u.email, u.rol, u.is_banned,u.ban_fecha `);
     
        

      return res.json(rows);

    }catch(err){
        console.error(err);
    }
});

adminRoutes.post('/ban/:userId', async(req, res) => {
      const {userId} = req.params;
      const {dias} = req.body;

      const ban_fecha = new Date();
      ban_fecha.setDate(ban_fecha.getDate() + dias);


    try {
      await db.query(`UPDATE users set is_banned = 1, ban_fecha = ? WHERE id = ?`,[ban_fecha, userId])
     
        

      return res.json({message: `Usuario baneado por ${dias}`});

    }catch(err){
        console.error(err);
    }
});

adminRoutes.post('/unban/:userId',async(req,res) => {
  const {userId} = req.params;
try {
   await db.query(`UPDATE users SET is_banned = 0, ban_fecha = null WHERE id = ?`,[userId])
  res.json({message:'Usuario desbaneado correctamente'})

}catch(err){
  console.error(err);
  return res.status(500).json({message: 'Error al desbanear el usuario'})
}

})
adminRoutes.get('/productos', async(req, res) => {

    try {
      
      const [rows] = await db.query(`SELECT * FROM productos`)

      return res.json(rows);

    }catch(err){
        console.error(err);
    }
});

