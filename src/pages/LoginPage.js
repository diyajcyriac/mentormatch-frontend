import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import "./LoginPage.css";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    const response = await fetch('https://mentormatch-backend-y3wu.onrender.com/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true); 
      });
    } else {
      alert('Invalid credentials');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <div className="login-container">
      <form onSubmit={login}>
        <div className="input_box">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input_box">
          <div className="password_title">
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Log In</button>
        <p className="sign_up">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </div>
  );
}
