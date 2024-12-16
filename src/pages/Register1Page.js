import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginPage.css"

export default function Register1Page() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(ev) {
        ev.preventDefault();
        if (!username || !password || !role) {
            setErrorMessage('Please fill in all fields');
            return;
        }
        if (username.length > 8) {
            setErrorMessage('Username cannot be more than 8 characters');
            return;
        }
        const data = { username, password, role };
        try {
            const response = await fetch('https://mentormatch-backend-y3wu.onrender.com/register-step-1', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (response.status === 201) {
                navigate('/register-step-2', { state: { userId: result._id, username } });
            } else {
                setErrorMessage(result.error || 'Registration failed. Please try again.');
            }
        } catch (err) {
            setErrorMessage('Error registering user');
            console.error(err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="login_form">
            <h1>Register (Step 1)</h1>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <div className="input_box">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
            </div>
            <div className="input_box">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
            </div>
            <div className="input_box">
                <label htmlFor="role">Select Role</label>
                <select id="role" value={role} onChange={(ev) => setRole(ev.target.value)} required>
                    <option value="">Select Role</option>
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                </select>
            </div>
            <button type="submit">Next</button>
        </form>
    );
}

