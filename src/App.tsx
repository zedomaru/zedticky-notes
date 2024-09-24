import NoteProvider from './context/NoteContext';
import NotesPages from './pages/NotesPages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './pages/LoginPages';
import { PrivateRoutes } from './utils';
import { AuthProvider } from './context/AuthContext';
import RegisterPages from './pages/RegisterPages';

function App() {
  return (
    <div id="app">
      <AuthProvider>
        <NoteProvider>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/" element={<NotesPages />} />
              </Route>
              <Route path="/login" element={<LoginPages />} />
              <Route path="/register" element={<RegisterPages />} />
            </Routes>
          </Router>
        </NoteProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
