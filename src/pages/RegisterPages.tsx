import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPages = () => {
  const registerForm = useRef<HTMLFormElement>(null);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = registerForm.current?.email.value;
    const password = registerForm.current?.password.value;
    const confirmPassword = registerForm.current?.confirmPassword.value;
    if (password !== confirmPassword) {
      return;
    }

    const userInfo = { email, password, confirmPassword };
    registerUser(userInfo);
  };
  return (
    <div>
      <form
        className="registration-form"
        ref={registerForm}
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email</label>
        <input type="text" placeholder="Email" id="email" />

        <label htmlFor="password">Password</label>
        <input type="password" placeholder="Password" id="password" />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          id="confirmPassword"
        />

        <button>Register</button>
        <small style={{ fontSize: '10px', marginLeft: '50%' }}>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </form>
    </div>
  );
};

export default RegisterPages;
