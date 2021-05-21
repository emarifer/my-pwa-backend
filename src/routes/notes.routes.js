import express from 'express';
import { verifyAuth } from '../helpers/authentication';
const router = express.Router();
import { 
    getAllNotes,
    getOneNote,
    createNewNote,
    updateNote,
    deleteNote
} from '../controllers/notes.controller';

// GET. get all documents or notes
router.get('/notes', verifyAuth, getAllNotes);

// GET. get a note with parameters (id)
router.get('/note/:id', verifyAuth, getOneNote);

// POST. route through which notes are added
router.post('/new-note', verifyAuth, createNewNote);

// PUT. upadate a note with the given id 
router.put('/note/:id', verifyAuth, updateNote);

// DELETE. delete a note with the given id 
router.delete('/note/:id', verifyAuth, deleteNote);


// GET. get documents(notes) with pagination
// router.get('/notes', verifyAuth, async (req, res) => {
//     const uid = req.user._id;
//     const limit = Number(req.query.limit) || 5; // Default es 5 (con operador cortocircuito)
//     const skip = Number(req.query.skip) || 0; // Por defecto empieza en el primer documeto
//     try {
//         const notesDB = await Note.find({ uid }).limit(limit).skip(skip); // Filtra la DB por "uid"
//         // Contar documentos
//         const totalNotes = await Note.find({ uid }).countDocuments();
//         res.json({ notesDB, totalNotes });
//     } catch (error) {
//         res.status(400).json({
//             message: 'Ocurrió un error',
//             error
//         });
//     }
// });

module.exports = router;