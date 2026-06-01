const express = require('express');
const router = express.Router();
const { getNotes, createNote, deleteNote } = require('../controllers/noteController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, getNotes);
router.post('/', authenticateToken, createNote);
router.delete('/:id', authenticateToken, deleteNote);

module.exports = router;