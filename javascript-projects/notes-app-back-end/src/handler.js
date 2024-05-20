const {nanoid} = require('nanoid');
const notes = require('./notes')
const addNoteHandler = (request, h) => {
const {title, tags, body} = request.payload;

const id = nanoid(16);
const createdAt = new Date().toISOString();
const updateAt = createdAt;

const newNote = {
    title, tags, body, createdAt, updateAt,
};

notes.push(newNote);

const isSuccess = notes.filter((note) => note.id === id).length > 0;
};

module.exports = {addNoteHandler};