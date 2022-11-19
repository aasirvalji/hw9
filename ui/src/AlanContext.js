import { useEffect, useRef, createContext, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import invalidAlanPaths from './utils/invalidAlanPaths.json';

const AlanContext = createContext();

function AlanProvider({ children }) {
  const alanBtnRef = useRef({}).current;
  const [connection, setConnection] = useState('temp');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    alanBtnRef.btnInstance = alanBtn({
      key: 'd89ef2cd996428f501751aa027a77ebc2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        console.log(Object.keys(commandData));
        if (commandData.command === 'go:back') {
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
