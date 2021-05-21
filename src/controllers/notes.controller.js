import Note from '../models/note';

module.exports = {
    getAllNotes: async (req, res) => {
        const uid = req.user._id;
        try {
            const notesDB = await Note.find({ uid }); // Filtra la DB por "uid"
            res.json(notesDB);
        } catch (error) {
            res.status(400).json({
                message: 'An error occurred.',
                error
            });
        }
    },
    getOneNote: async (req, res) => {
        const _id = req.params.id; // Hay recordar que en MongoDB el id es un parametro precedido por guion bajo ("_")
    
        try {
            const noteaDB = await Note.findOne({ _id });
            res.json(noteaDB); // No es necesario el status 200
        } catch (error) {
            res.status(400).json({
                message: 'An error occurred.',
                error
            });
        }
    },
    createNewNote: async (req, res) => {
        const body = req.body;
        body.uid = req.user._id;
    
        try {
            const noteDB = await Note.create(body);
            // Contar documentos
            // const totalNotes = await Note.find({ uid: body.uid }).countDocuments();
            res.status(200).json({ noteDB/* , totalNotes */ }); // El status 200 viene por defecto: no es necesario
        } catch (error) {
            res.status(500).json({
                message: 'An error occurred.',
                error
            });
        }
    },
    updateNote: async (req, res) => {
        const _id = req.params.id;
        const body = req.body;
    
        try {
            const noteDB = await Note.findByIdAndUpdate(_id, body, { new: true });
            res.json(noteDB);
        } catch (error) {
            res.status(400).json({
                message: 'An error occurred.',
                error
            });
        }
    },
    deleteNote: async (req, res) => {
        const _id = req.params.id;
    
        try {
            const noteDB = await Note.findByIdAndDelete({ _id });
            // Contar documentos
            // const totalNotes = await Note.find({ uid: req.user._id }).countDocuments();
            res.json({ noteDB/* , totalNotes */ });
        } catch (error) {
            res.status(400).json({
                message: 'An error occurred.',
                error
            });
        }
    }
};
