import { useContext } from 'react';
import Logout from '../assets/icons/Logout';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };
  return (
    <div
      id="add-btn"
      style={{ position: 'fixed', right: '40px', top: '20px' }}
      onClick={handleLogout}
    >
      <Logout />
    </div>
  );
};

export default LogoutButton;
