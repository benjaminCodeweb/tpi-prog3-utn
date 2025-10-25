import jwt from 'jsonwebtoken';

export function verifyToken(req,res,next) {
    const header = req.headers['authorization'];

    if(!header) {
         console.warn("🔴 No se recibió header Authorization");
        return res.status(401).json({message: "No se proporciono el token"})
    }

    const token =  header.split(' ')[1];
    if (!token) {
         console.warn("🔴 No se recibió token en el header");
        return res.status(401).json({message: "Usuario inautorizado"});
    }
    try {
        const secretKey = 'tiendafy'
        const payload = jwt.verify(token, secretKey);
        console.log(payload);

        req.user = payload
        next();

    }catch(error){
        return res.status(403).json({message: 'No posee permisos correctos'});
    }
};

export function verifyAdmin(req,res,next) {
    verifyToken(req,res, () => {
        const {rol} = req.user;
        if(rol === 'admin') {
            next();
        } else {
            return res.status(403).json({message: 'Acceso denegado, requiere rol administrador'})
        }
    }) 
}