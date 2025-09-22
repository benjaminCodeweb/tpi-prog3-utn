import cors from 'cors';
import express from 'express';
import axios from 'axios';
import mysql2 from 'mysql2/promise';
import { db } from '../db/db.js';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken'



export const userRoutes = express.Router();


userRoutes.post('/register', async(req,res) => {
    const {username, email, password, rol} = req.body;

    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashPassword = await  bcrypt.hash(password, saltRounds);

        const res = await db.query(`INSERT INTO users (username, email, hashPassword, rol) VALUES(?, ?, ?, ?)`,
            [username, email, hashPassword, rol]
        )
    }catch(err) {
        console.error('error al guardar en la bbdd', err);
    }
});

userRoutes.post('/login', async(req,res) => {
    const {email, password} = req.body;

    
        try {
        const [response]= await db.query(`SELECT username, email, hashPassword, rol  FROM users WHERE email = ?`, [email]);
        const[rows] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

        const user = rows[0];


        const hashPasswords = response[0].hashPassword;

        const match = await bcrypt.compare(password, hashPasswords);
        if(!match) {
            return response.status(400).json({success: false, message: 'Contrasena incorrecta'})
        };

        const secretKey = 'tiendafy';
        const userr ={
            id: user.id, 
            username: user.username, 
            email: user.email,
            rol: user.rol
        }

        const token = jwt.sign(user, secretKey, {expiresIn: '1h'});


        return res.json({
            
            success: true,
            token,
            userr
           
        });


    }catch(err) {
        console.error('error interno del server', err);
    }
})