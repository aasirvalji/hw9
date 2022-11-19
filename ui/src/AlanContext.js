import { useEffect, useRef, createContext, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import invalidAlanPaths from './utils/invalidAlanPaths.json';
import { useNavigate } from 'react-router-dom';
import validAppPaths from './utils/validAppPaths.json';

const AlanContext = createContext();

function AlanProvider({ children }) {
  const navigate = useNavigate();
  const alanBtnRef = useRef({}).current;
  const [connection, setConnection] = useState('temp');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: '01795eea06de166d09dcc410696ad0a52e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'navigation') {
          navigate(`/${commandData.route}`, { replace: true });
          // Call the client code that will react to the received command
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
      }}
    >
      {children}
    </AlanContext.Provider>
  );
}
export { AlanContext, AlanProvider };
