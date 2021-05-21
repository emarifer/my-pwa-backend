import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    description: String,
    uid: String,
    date: {
        type: Date,
        default: Date.now
    },
    /* active: {
        type: Boolean,
        default: true
    } */
}); // VER NOTA

// Convertir a modelo
const Note = mongoose.model('Note', noteSchema);

export default Note;

// Si la collection se inicia cuando el usuario crea un objeto la primera vez, MongoDB iniciara automaticamente la collection. Sin embargo, si el usuario trata de recuperar el contenido de una collection vacia al conectarse por primera vez, sera preciso agregar al final del modelo un objeto option con el nombre de la collection que figure en la base de datos o el que nosotros queramos darle para que la cree. Si creamos el objeto la primera vez, MongoDB le asignara un nombre automatico que sera el del modelo agregandole una "s" y en minusculas. VER:
// https://github.com/emarifer/my-project-nodejs/blob/master/models/pet.js
// https://stackoverflow.com/questions/18628656/model-find-returns-empty-in-mongoose
// https://mongoosejs.com/docs/guide.html#collection