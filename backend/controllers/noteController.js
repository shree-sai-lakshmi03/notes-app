const db = require('../database/db');

// Get all notes for logged-in user
function getNotes(req, res) {
    const notes = db.prepare('SELECT * FROM notes WHERE user_id = ?').all(req.user.id);
    res.json(notes);
}

// Create a note
function createNote(req, res) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const stmt = db.prepare('INSERT INTO notes (title, user_id) VALUES (?, ?)');
    const result = stmt.run(title, req.user.id);
    res.json({ id: result.lastInsertRowid, title, user_id: req.user.id });
}

// Delete a note
function deleteNote(req, res) {
    const { id } = req.params;
    db.prepare('DELETE FROM notes WHERE id = ? AND user_id = ?').run(id, req.user.id);
    res.json({ message: 'Note deleted' });
}

module.exports = { getNotes, createNote, deleteNote };