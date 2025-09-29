import cors from 'cors';
import express from 'express';
import axios from 'axios';
import mysql2 from 'mysql2';
import { db } from '../db/db.js';


export const productRoutes = express.Router();


productRoutes.post('/', async(req,res) => {
    const {nombre, describe, precio, categoria} = req.body;
    const userId = req.user.id

    try {
       const [response]=  await db.query(
            `INSERT INTO productos (nombre, descrip, precio, user_id, categoria) VALUES(?, ?, ?, ?, ?)  `,
            [nombre, describe, precio, userId, categoria, ]
        );
        const data = response[0];
        

        if(response.length === 0 || !response) {
            return res.status(400).json({message: 'error al gurdar el procuto'})
        }
       

        res.status(201).json({message: "Producto creado correctamente"})

        
    }catch(err) {
        console.error('error al guardar en la bbdd: ',err)
    }
});

productRoutes.get('/', async(req,res)=> {
 
    try {
           const userId = req.user.id

           console.log("🔧 Usuario autenticado en GET productos:", userId);
           
        const[rows] = await db.query(`SELECT * FROM productos WHERE user_id= ?`,[userId]);

        res.json(rows)
    }catch(err){
        return res.status(500).json({err: 'error interno del servidor'})
    }
})
productRoutes.get('/general', async(req,res)=> {
 
    try {
           

        
           
        const[rows] = await db.query(`SELECT * FROM productos`);

        res.json(rows)
    }catch(err){
        return res.status(500).json({err: 'error interno del servidor'})
    }
});

productRoutes.post('/comprar', async(req,res) => {
    const {products} = req.body;

    const productIds = products.map(p => p.id);

   
    try {
        const[result] = await db.query(`UPDATE productos SET estado = 'Vendido' WHERE id IN (?)`, [productIds]);

        res.json({updated: result.affectedRows})
    }catch(err){
        console.error('error intenro del servidor', err);


    }
});

productRoutes.get('/stats', async(req,res) => {
    try {

        const userId = req.user.id;

        const[totalProductos]= await db.query(`SELECT COUNT(*) AS total FROM productos WHERE user_id = ?`,
            [userId]
        );

        const[totalVendidos] = await db.query(`SELECT COUNT(*) AS vendidos FROM productos WHERE user_id = ? AND estado = 'Vendido'`,[userId]);

        const[ingresos] = await db.query(`SELECT COALESCE(SUM(precio), 0)AS total_ingresos FROM productos WHERE user_id = ? AND estado = 'Vendido'`,[
            userId
        ])

        res.json({
           productos: totalProductos[0].total,
           totalVendido: totalVendidos[0].vendidos,
           ingreso:  ingresos[0].total_ingresos
        });
    }catch(err){
        console.error(err);
    }
    
});

productRoutes.delete('/:id', async(req,res) => {
    const {id} = req.params;
    const userId = req.user.id

    const[rows] = await db.query(`
        DELETE FROM productos WHERE id = ? AND user_id = ?`, [id, userId]);

    if(rows.affectedRows === 0) {
        return res.status(404).json({error: 'Error al encontrar el producto'});
    }



        res.json({message: 'Producto borrado correctamente', deleteId: id});
        
});

productRoutes.get('/stats-sellers', async(req,res)=> {
    const userId = req.user.id;


    try {


        const[totalComprado] = await db.query(`SELECT COUNT(*) FROM ordenes WHERE user_id = ?`,[userId]);

        const[totalGasto] = await db.query(`SELEC SUM(total) FROM ordenes WHERE user_id = ?`,[userId]);

        res.json({
            comprado: totalComprado[0],
            totalGastado: totalGasto[0]
        })
    }catch(err){
        console.error(err);
    }
})