import { useEffect, useRef, createContext, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import invalidAlanPaths from './utils/invalidAlanPaths.json';
import { useNavigate } from 'react-router-dom';
import validAppPaths from './utils/validAppPaths.json';
import nums from './utils/nums.json';

const AlanContext = createContext();

function AlanProvider({ children }) {
  const navigate = useNavigate();
  const alanBtnRef = useRef({}).current;
  const [connection, setConnection] = useState('temp');
  const [ready, setReady] = useState(false);
  const [pillData, setPillData] = useState(null);
  const [readPills, setReadPills] = useState(false);
  const [pillsTaken, setPillsTaken] = useState(false);
  const [takenPill, setTakenPill] = useState(false);

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: '01795eea06de166d09dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'navigation') {
          navigate(`/${commandData.route}`, { replace: true });
        }
        if (commandData.command === 'new-navigation') {
          console.log('from alan new window');
          window.open('http://localhost:3000/appointment', '_blank');
        }
        if (commandData.command === 'read-pill') {
          var regExp = /[a-zA-Z]/g;
          var num = regExp.test(commandData.num)
            ? nums[commandData.num]
            : Number(commandData.num);
          setPillData(num);
        }
        if (commandData.command === 'read-pills') {
          setReadPills(true);
        }
        if (commandData.command === 'take-pills') {
          setPillsTaken(true);
        }
        if (commandData.command === 'post-pills') {
          setTakenPill(true);
        }
      },
      onConnectionStatus: function (status) {
        setConnection(status);
      },
    });
  }, []);

  useEffect(() => {
    // console.log('from outside block');
    if (alanBtnRef?.btnInstance && connection === 'authorized') {
      // console.log('from inside block', alanBtnRef.btnInstance);
      setReady(true);
    }
  }, [alanBtnRef, connection]);

  function checkAlanVisibility(path) {
    if (invalidAlanPaths.includes(path)) {
      // console.log('INVALID PATH FOUND: ' + alanBtnRef.btnInstance.remove());
      document.querySelector('.alanBtn-root').style.display = 'none';
    } else {
      document.querySelector('.alanBtn-root').style.display = 'block';
    }
  }

  return (
    <AlanContext.Provider
      value={{
        alanBtnRef,
        connection,
        ready,
        checkAlanVisibility,
        pillData,
        setPillData,
        readPills,
        setReadPills,
        pillsTaken,
        setPillsTaken,
        takenPill,
        setTakenPill,
      }}
    >
      {children}
    </AlanContext.Provider>
  );
}
export { AlanContext, AlanProvider };
