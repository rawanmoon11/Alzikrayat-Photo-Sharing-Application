import './App.css';
import { useState } from 'react';
import './assets/style.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import PhotoDetails from './pages/PhotoDetail';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UploadPhoto from './components/UploadPhoto';
import LoginRegister from './pages/LoginRegister';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  return (
    <>
      <Navbar user={user} onlogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/photo/:id" element={<PhotoDetails />} />
        <Route element={<LoginRegister />}>
          <Route path="/login" element={<LoginForm setUser={setUser} />} />
          <Route path="/register" element={<RegisterForm />} />
        </Route>
        <Route path="/upload" element={<UploadPhoto />} />
        <Route path="/loginregister" element={<LoginRegister />} />

      </Routes>
    </>

  )
};
export default App
