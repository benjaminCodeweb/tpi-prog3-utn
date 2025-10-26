import cors from 'cors';
import express from 'express';
import axios from 'axios';
import mysql2 from 'mysql2';
import { db } from '../db/db.js';
import multer from 'multer';

export const productRoutes = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');

    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9);
        const ext = file.originalname.split('.').pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`)
    }
});

const upload = multer({ storage: storage })


productRoutes.post('/', upload.single('imagen'), async (req, res) => {
    const { nombre, describe, precio, categoria } = req.body;
    const imagenPath = req.file ? `/uploads/${req.file.filename}`.replace(/\\/g, '/') : null;


    const userId = req.user.id

    try {
        const [response] = await db.query(
            `INSERT INTO productos (nombre, descrip, precio, user_id, categoria, imagen) VALUES(?, ?, ?, ?, ?, ?)  `,
            [nombre, describe, precio, userId, categoria, imagenPath]
        );
        const data = response[0];


        if (response.length === 0 || !response) {
            return res.status(400).json({ message: 'error al gurdar el procuto' })
        }


        res.status(201).json({ message: "Producto creado correctamente" })


    } catch (err) {
        console.error('error al guardar en la bbdd: ', err)
    }
});

productRoutes.get('/', async (req, res) => {

    try {
        const userId = req.user.id

        console.log("🔧 Usuario autenticado en GET productos:", userId);

        const [rows] = await db.query(`SELECT * FROM productos WHERE user_id= ?`, [userId]);

        res.json(rows)
    } catch (err) {
        return res.status(500).json({ err: 'error interno del servidor' })
    }
})
productRoutes.get('/general', async (req, res) => {

    try {




        const [rows] = await db.query(`SELECT * FROM productos`);

        res.json(rows)
    } catch (err) {
        return res.status(500).json({ err: 'error interno del servidor' })
    }
});

productRoutes.post('/comprar', async (req, res) => {
    const { products } = req.body;

    const productIds = products.map(p => p.id);
    const userId = req.user.id;


    try {
        const [result] = await db.query(`UPDATE productos SET estado = 'Vendido' WHERE id IN (?)`, [productIds]);

        await db.query(`UPDATE productos set vendidos = vendidos + 1 WHERE id IN (?)`, [productIds]);

        const total = products.reduce((sum, p) => sum + p.precio, 0);

        await db.query(`INSERT INTO ordenes (user_id, total, cantidad_productos) VALUES (?, ?, ?)`, [userId, total, products.length]);

        res.json({ message: 'Compra procesada correctamente' })
    } catch (err) {
        console.error('error intenro del servidor', err);


    }
});

productRoutes.get('/stats', async (req, res) => {
    try {

        const userId = req.user.id;

        const [totalProductos] = await db.query(`SELECT COUNT(*) AS total FROM productos WHERE user_id = ?`,
            [userId]
        );

        const [totalVendidos] = await db.query(`SELECT COUNT(*) AS vendidos FROM productos WHERE user_id = ? AND estado = 'Vendido'`, [userId]);

        const [ingresos] = await db.query(`SELECT COALESCE(SUM(precio), 0)AS total_ingresos FROM productos WHERE user_id = ? AND estado = 'Vendido'`, [
            userId
        ])

        const [topVendidos] = await db.query('SELECT *  FROM productos ORDER BY vendidos DESC LIMIT 5');


        res.json({
            productos: totalProductos[0].total,
            topVendidos,
            totalVendido: totalVendidos[0].vendidos,
            ingreso: ingresos[0].total_ingresos
        });
    } catch (err) {
        console.error(err);
    }

});

productRoutes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    const [rows] = await db.query(`
        DELETE FROM productos WHERE id = ? AND user_id = ?`, [id, userId]);

    if (rows.affectedRows === 0) {
        return res.status(404).json({ error: 'Error al encontrar el producto' });
    }



    res.json({ message: 'Producto borrado correctamente', deleteId: id });

});

productRoutes.get('/stats-sellers', async (req, res) => {
    const userId = req.user.id;


    try {


        const [totalComprado] = await db.query(`SELECT COUNT(*) AS total_comprado FROM ordenes WHERE user_id = ?`, [userId]);

        const [totalGasto] = await db.query(`SELECT COALESCE(SUM(total),0) as total_gastado FROM ordenes WHERE user_id = ?`, [userId]);
        const [topProducto] = await db.query(`SELECT * FROM productos WHERE id = ?`, [userId])
        res.json({
            comprado: totalComprado[0].total_comprado,
            totalGastado: totalGasto[0].total_gastado
        })
    } catch (err) {
        console.error(err);
    }
});

productRoutes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descrip, precio } = req.body;
    const userId = req.user.id;

    try {

        const response = await db.query(`UPDATE productos SET nombre = ?, descrip = ?, precio = ? WHERE id = ? AND user_id = ? `, [nombre, descrip, precio, id, userId]);


        return res.json({
            response
        })
    } catch (err) {
        console.error(err)
    }

})