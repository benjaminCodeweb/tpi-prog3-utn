import cors from 'cors';
import express from 'express';
import { productRoutes } from '../backend/routes/productsRoutes.js';
import { userRoutes } from '../backend/routes/userRoutes.js';
import { verifyAdmin, verifyToken } from './auths/middlewhereAuth.js';
import { adminRoutes } from './routes/adminRoutes.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { middlewhereBan } from './auths/middlewhereBan.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const PORT = 3000;
app.use(express.json());
app.use(cors());


app.use('/api/products', verifyToken, middlewhereBan, productRoutes,  );
app.use('/api/users', userRoutes  );
app.use('/api/admins', adminRoutes, verifyAdmin);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.listen(PORT, async() => {
    console.log(`servidor corriendo en ${PORT}`);
    
})