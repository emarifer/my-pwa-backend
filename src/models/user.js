import mongoose from 'mongoose';
const { Schema } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';

/* const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE}: Invalid Role',
}; */

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El Nombre de Usuario es necesario'],
    },
    email: {
        type: String,
        required: [true, 'El Email del Usuario es necesario'],
        unique: true,
    },
    pass: {
        type: String,
        required: [true, 'El Pass del Usuario es obligario'],
    },
    /* avatar: {
        type: String,
    }, */
    date: {
        type: Date,
        default: Date.now
    },
    /* role: {
        type: String,
        default: 'USER',
        enum: roles,
    },
    active: {
        type: Boolean,
        default: true
    }, */
});

userSchema.plugin(uniqueValidator, { message: 'Error, el campo {PATH} debe ser único.' });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.pass;
    return obj; // Esto se hace para que no se retorne el pass en el JSON respuesta
}; // VER NOTA

const User = mongoose.model('User', userSchema);

export default  User;

/* 
https://bluuweb.github.io/mevn/04-auth/#models
https://contactsunny.medium.com/hide-properties-of-mongoose-objects-in-node-js-json-responses-a5437a5dbec2
*/