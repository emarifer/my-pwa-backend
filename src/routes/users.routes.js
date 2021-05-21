import express from 'express';
const router = express.Router();
import { createNewUser, loginUser } from "../controllers/users.controller";

// POST. route through which users are added
router.post('/new-user', createNewUser);

// POST. Route through which we login a user.
router.post('/login', loginUser);

// PUT. upadate a user with the given id 
/* router.put('/user/:id', [verifyAuth, verifyRol], async (req, res) => {
    const _id = req.params.id;
    const body = _.pick(req.body, ['name', 'email', 'pass', 'active']); // No permite modificar el rol

    if (body.pass) body.pass = bcrypt.hashSync(req.body.pass, saltRounds);

    try { // Devuelve el usuario actualizado (al poner "new: true")
        const userDB = await User.findByIdAndUpdate(_id, body, {
            new: true,
            runValidators: true,
            context: 'query' // Permite actualizar el email si es "unique"
        });
        res.json(userDB);
    } catch (error) {
        res.status(400).json({
            message: 'Ocurrió un error',
            error
        });
    }
}); */

module.exports = router;

// ERROR AL USAR LA LIBRERIA DE VALIDACION 'mongoose-unique-validator':
// https://es.stackoverflow.com/questions/345025/mongoose-unique-validator-message-cannot-read-property-ownerdocument-of-nu