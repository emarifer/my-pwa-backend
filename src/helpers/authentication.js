import jwt from 'jsonwebtoken';

const verifyAuth = (req, res, next) => {
    const authorization = req.get('authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
        
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: 'Unauthenticated user.',
                    err
                });
            };
    
            // Creamos una nueva propiedad con la info del usuario
            req.user = decoded.data; //data viene al generar el token en login.routes.js
            next();
        });    
    } else {
        return res.status(401).json({
            message: 'Unauthenticated user.'
        });
    }
};

module.exports = { verifyAuth };
