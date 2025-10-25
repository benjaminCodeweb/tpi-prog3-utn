import cors from 'cors';
import express from 'express';
import axios from 'axios';
import mysql2 from 'mysql2/promise';
import { db } from '../db/db.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { verifyToken } from '../auths/middlewhereAuth.js';
import { middlewhereBan } from '../auths/middlewhereBan.js';



export const userRoutes = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'benjamincervigni@gmail.com', // tu Gmail
    pass: 'myps anio jcem htqy', // tu contraseña o app password
  },
});


userRoutes.post('/register', async(req,res) => {
    const {username, email, password, rol} = req.body;

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashPassword = await  bcrypt.hash(password, saltRounds);

        const response = await db.query(`INSERT INTO users (username, email, hashPassword, rol) VALUES(?, ?, ?, ?)`,
            [username, email, hashPassword, rol]
        );

        const usernameDb = await db.query(`SELECT username FROM users`);
        const emailDb = await db.query(`SELECT email FROM users`);

        if(usernameDb === username) {
            return res.status(400).json({success: false, message: 'Nombre de usuario existente'})
        };

        if(emailDb === email) {
            return res.status(400).json({success: false, message: 'Email existente'})
        };

        return res.json({
            success: true,
            username,
            email,
            hashPassword,
            rol
        })
    }catch(err) {
        console.error('error al guardar en la bbdd', err);
        if(err.sqlMessage.includes('users.username')) {
            return res.status(400).json({success: false, message: 'Usuario ya existente'})
        }

         console.error('error al guardar en la bbdd', err);
        if(err.sqlMessage.includes('users.email')) {
            return res.status(400).json({success: false, message: 'Email ya existente'})
        }
    
    }
});

userRoutes.post('/login', async(req,res) => {
    const {email, password} = req.body;
        try {
        const [response]= await db.query(`SELECT *  FROM users WHERE email = ?`, [email]);
        

        const user = response[0];

         if(!user) {
            return res.status(400).json({success: false, message: 'Usuario no  encontrado'})
        };
        
        const match = await bcrypt.compare(password, user.hashPassword);

        if(!match) {
            return res.status(400).json({success: false, message: 'Contrasena incorrecta'})
        };

        if(user.is_banned) {
            const fechaBan = new Date(user.ban_fecha);
  const fechaFormateada = fechaBan.toLocaleString('es-AR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
});


            return res.status(403).json({message: `Usted ha sido baneado hasta la fecha ${fechaFormateada}`})
        }
       

        const secretKey = 'tiendafy';

        const userr ={
            id: user.id, 
            username: user.username, 
            email: user.email,
            rol: user.rol
        }

        const token = jwt.sign(userr, secretKey, {expiresIn: '1h'});


        return res.json({
            
            success: true,
            token,
            userr
           
        });


    }catch(err) {
        console.error('error interno del server', err);
        return res.status(500).json({message: 'Error interno del servidor'})
    }
});

userRoutes.post('/forgot-password', async(req,res) => {
    const {email} = req.body;

    try {
      const[rows]= await db.query(`SELECT * FROM users WHERE email = ?`,[
        email
      ]);

      const user = rows[0];

      if(!user) {
        res.status(400).json({message: 'Usuario no encontrado'});

      }

      const token = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 3600000);

      await db.query(`UPDATE users SET reset_token = ?, reset_expires = ? WHERE email = ?`,[token, expiresAt, email]);
      

      const resetLink = `http://localhost:5173/reset-password/${token}`;



    await transporter.sendMail({
        from: 'benjamincervigni@gmail.com',
        to: user.email,
        subject: 'Restablecer contrasena',
        html: `
        h2>Hola!</h2>
        <p>Has pedido restablecer tu contraseña.</p>
        <p>Haz clic aquí para crear una nueva contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Este enlace expira en 1 hora.</p>`
        
    });

    res.json({success: true, message: 'Email enviado con instrucciones'});
        


    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Error interno del servidor'})
    }
});

userRoutes.post('/reset-password/:token', async(req,res) => {
    const {token} = req.params;
    const {password} = req.body;

    try{
        const[rows]= await db.query(`SELECT id, reset_expires FROM users WHERE reset_token = ?`, [token]);

        const user = rows[0];

        if (!user) return res.status(400).json({ message: 'Token inválido' });

        if (new Date(user.resetExpires) < new Date()) {
            return res.status(400).json({ message: 'Token expirado' });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await db.query(`UPDATE users SET hashPassword = ?, reset_expires = NULL, reset_token = NULL WHERE ID = ?`, [hashPassword, user.id]);

        res.json({success:true, message:'Contrasena actualizada con exito'})

    }catch(err){
        console.error(err);
        return res.status(500).json({message: 'Error intenro del servidor'})
    }
});

userRoutes.get('/profiles', verifyToken, middlewhereBan, async(req,res)=>{
    const userId = req.user.id;

    res.json({id: userId});
})