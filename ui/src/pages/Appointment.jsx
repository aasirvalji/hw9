import React, { useEffect, useState, useContext } from 'react';
import CONSTS from '../utils/consts.json';
import axios from 'axios';
import { AlanContext } from '../AlanContext';

const BASE_URL = CONSTS.BASE_URL;

function Appointment() {
  const { alanBtnRef } = useContext(AlanContext);

  const [apps, setApps] = useState([]);
  const [docs, setDocs] = useState([]);
  const getApps = async () => {
    const res = await axios.get(`${BASE_URL}/api/appointment`);
    setApps(res.data);
  };
  const getDocs = async () => {
    const res = await axios.get(`${BASE_URL}/api/doctors`);
    setDocs(res.data);
  }

  useEffect(() => {
    getDocs();
    getApps();
  }, []);

  // const populateDocSelect = () => {
  //   let vals = [];
  //   if (!docs) return;
  //   for (let i = 0; i < docs.length; i++)
  //     vals.push(<option key={i} value={docs[i]}>{docs[i]}</option>)
  //   return vals;
  // }

  return <div>
    <h1>Appointments</h1>
    <div>
    </div>
    <h2>Book an Appoinment</h2>
    <div></div>
    <h2>Doctors:</h2>
    <div>
      {docs ? (docs.map((doc, idx) => {
        return (<div key={idx}>
          <div>
            <p>id: {doc._id}</p>
            <p>name: {doc.fullName}</p>
            <p>username: {doc.username}</p>
            <ul>practices: {
              doc.practices ? (doc.practices.map((p, idx) => (<li key={idx}>{p}</li>))) : null}
            </ul>
          </div>
        </div>);
      })) : null}
    </div>
  </div>;
}

export default Appointment;
