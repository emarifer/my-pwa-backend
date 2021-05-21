import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'underscore'; // Para filtrar campos de PUT
const saltRounds = 10;
// import { verifyAuth } from '../middlewares/authentication';

module.exports = {
    createNewUser: async (req, res) => {
        const body = {
            name: req.body.name,
            email: req.body.email,
            pass: bcrypt.hashSync(req.body.pass, saltRounds),
            // avatar: req.body.avatar,
            // role: req.body.role,
        };
    
        try {
            const userDB = await User.create(body);
    
            // Generar token
            const token = jwt.sign({
                data: userDB // No tiene el password porque asi lo configuramos en el schema
            }, process.env.SECRET, { expiresIn: 60 * 60 * 24 }); // Expira en 1 dia. (60 * 60 * 24 * 30)
    
            res.status(200).json({ userDB, token }); // El status 200 viene por defecto: no es necesario
        } catch (error) {
            res.status(500).json({
                message: 'The email already exists in the Database. Please enter another value.',
                error
            });
        }
    },
    loginUser: async(req, res) => {

        const body = req.body;
        try {
            // Evaluando Email
            const userDB = await User.findOne({ email: body.email });
            if (!userDB) { // Si el email no ha sido encontrado en la DB
                return res.status(400).json({
                    message: 'Invalid credentials.' // Email no encontrado
                }); // para no dar informacion a usuarios maliciosos
            };
    
            // Evaluando Password
            if(!bcrypt.compareSync(body.pass, userDB.pass)) { // Si la comparacion del pass que enviamos y la contraseña encriptada que viene de la DB no coinciden
                return res.status(400).json({
                    message: 'Invalid credentials.' // Contraseña incorrecta
                }); // para no dar informacion a usuarios maliciosos
            };
    
            // Generar token
            const token = jwt.sign({
                data: userDB // No tiene el password porque asi lo configuramos en el schema
            }, process.env.SECRET, { expiresIn: 60 * 60 * 24 }); // Expira en 1 dia. (60 * 60 * 24 * 30)
    
            // Ahora si devolvemos la respuesta. El status 200 viene por defecto: no es necesario
            res.status(200).json({ userDB, token });
        } catch (error) {
            res.status(400).json({
                message: 'An error occurred.',
                error
            });
        }
    }
};
