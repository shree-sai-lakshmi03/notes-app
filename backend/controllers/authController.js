const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database/db');
const { SECRET } = require('../middleware/auth');

// Register
function register(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'All fields required' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
        const stmt = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        stmt.run(name, email, hashedPassword);
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(400).json({ error: 'Email already exists' });
    }
}

// Login
function login(req, res) {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Wrong password' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, SECRET, { expiresIn: '1d' });
    res.json({ token, name: user.name });
}

module.exports = { register, login };