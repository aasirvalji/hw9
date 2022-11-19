import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PatientLogin from './pages/PatientLogin';
import PatientRegister from './pages/PatientRegister';
import DoctorLogin from './pages/DoctorLogin';
import DoctorRegister from './pages/DoctorRegister';
import Pills from './pages/Pills';
import Order from './pages/Order';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Webcam from './pages/Webcam';
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import CONSTS from './utils/consts.json';
import { AlanContext } from './AlanContext';
import { UserContext } from './UserContext';

const { BASE_URL } = CONSTS;

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const { checkAlanVisibility, ready } = useContext(AlanContext);
  const { setData, setLoading } = useContext(UserContext);

  useEffect(() => {
    if (ready) checkAlanVisibility(window.location.pathname);
  }, [checkAlanVisibility, ready]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/auth`);
        setData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setData(null);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/webcam' element={<Webcam />} />

        <Route path='/patient-login' element={<PatientLogin />} />
        <Route path='/patient-register' element={<PatientRegister />} />

        <Route path='/doctor-login' element={<DoctorLogin />} />
        <Route path='/doctor-register' element={<DoctorRegister />} />

        <Route path='/pills' element={<Pills />} />
        <Route path='/order' element={<Order />} />

        <Route path='/appointment' element={<Appointment />} />
      </Routes>
    </>
  );
}

export default App;
