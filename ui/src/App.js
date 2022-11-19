import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PatientLogin from './pages/PatientLogin';
import PatientRegister from './pages/PatientRegister';
import DoctorLogin from './pages/DoctorLogin';
import DoctorRegister from './pages/DoctorRegister';
import Navbar from './components/Navbar';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import CONSTS from './utils/consts.json';
import { AlanContext } from './AlanContext';

const { BASE_URL } = CONSTS;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { checkAlanVisibility, ready } = useContext(AlanContext);

  useEffect(() => {
    if (ready) checkAlanVisibility(window.location.pathname);
  }, [checkAlanVisibility, ready]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />

        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path='/patient-register' element={<PatientRegister />} />

        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/doctor-register' element={<DoctorRegister />} />
      </Routes>
    </>
  );
}

export default App;
