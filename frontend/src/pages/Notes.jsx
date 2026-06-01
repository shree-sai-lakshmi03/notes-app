import { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();
    const name = localStorage.getItem('name');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        const res = await getNotes();
        setNotes(res.data);
    };

    const handleAdd = async () => {
        if (!title.trim()) return;
        await createNote({ title });
        setTitle('');
        fetchNotes();
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        fetchNotes();
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>👋 Hey, {name}!</h2>
                <button style={styles.logout} onClick={handleLogout}>Logout</button>
            </div>

            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    placeholder="Write a note..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                />
                <button style={styles.addBtn} onClick={handleAdd}>Add</button>
            </div>

            <div>
                {notes.length === 0 && <p style={styles.empty}>No notes yet. Add one above!</p>}
                {notes.map((note) => (
                    <div key={note.id} style={styles.noteCard}>
                        <span>{note.title}</span>
                        <button style={styles.deleteBtn} onClick={() => handleDelete(note.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: { maxWidth: '600px', margin: '2rem auto', padding: '0 1rem' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    logout: { padding: '8px 16px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    inputRow: { display: 'flex', gap: '10px', marginBottom: '1.5rem' },
    input: { flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
    addBtn: { padding: '10px 20px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
    noteCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '10px', marginBottom: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' },
    deleteBtn: { padding: '6px 12px', background: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '6px', cursor: 'pointer' },
    empty: { textAlign: 'center', color: '#aaa', marginTop: '2rem' },
};

export default Notes;