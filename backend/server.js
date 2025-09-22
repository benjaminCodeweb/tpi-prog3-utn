import cors from 'cors';
import express from 'express';
import { productRoutes } from '../backend/routes/productsRoutes.js';
import { userRoutes } from '../backend/routes/userRoutes.js';
import { verifyToken } from './auths/middlewhereAuth.js';



const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());


app.use('/api/products', verifyToken, productRoutes );
app.use('/api/users',  userRoutes );

app.listen(PORT, async() => {
    console.log(`servidor corriendo en ${PORT}`);
    
})