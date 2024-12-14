import React from 'react';
import { auth } from '../firebase-config.tsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const password = target.password.value;

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        localStorage.setItem("isAuth", "true");
        setIsAuth(true);
        navigate('/edit');
      })
      .catch((error) => {
        console.error('Sign in error:', error);
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
