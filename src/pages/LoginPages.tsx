import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { loginUser, user } = useAuth();
  const navigate = useNavigate();
  const loginRef = useRef<HTMLFormElement>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = loginRef.current?.email.value;
    const password = loginRef.current?.password.value;
    const userInfo = {
      email,
      password,
    };
    if (email && password) {
      loginUser(userInfo);
    }
  };
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  return (
    <div>
      <form className="login-form" ref={loginRef} onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="Email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Log In</button>
        <small style={{ fontSize: '10px', marginLeft: '50%' }}>
          Don't have an account? <Link to="/register">Register</Link>
        </small>
      </form>
    </div>
  );
};

export default LoginPage;
