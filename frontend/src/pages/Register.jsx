import { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(form);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create Account</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input style={styles.input} name="name" placeholder="Name" onChange={handleChange} required />
                    <input style={styles.input} name="email" type="email" placeholder="Email" onChange={handleChange} required />
                    <input style={styles.input} name="password" type="password" placeholder="Password" onChange={handleChange} required />
                    <button style={styles.button} type="submit">Register</button>
                </form>
                <p style={styles.link}>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' },
    card: { background: 'white', padding: '2rem', borderRadius: '12px', width: '360px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
    title: { marginBottom: '1.5rem', textAlign: 'center' },
    input: { width: '100%', padding: '10px', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' },
    button: { width: '100%', padding: '10px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' },
    error: { color: 'red', marginBottom: '1rem', textAlign: 'center' },
    link: { marginTop: '1rem', textAlign: 'center', fontSize: '14px' },
};

export default Register;