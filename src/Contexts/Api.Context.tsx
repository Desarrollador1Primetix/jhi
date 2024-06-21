import {DeviceUUID} from 'device-uuid';
import React, {createContext, useContext} from 'react';
import secureLocalStorage from 'react-secure-storage';
import {ApiContextType, User} from '../Types/Types';

const ApiContext = createContext<ApiContextType>({
  apiUrl: 'https://api2.primetix.fun',
  idCountry: 1,
  showSnackbar: false,
  messageSnackbar: '',
  uuid: '',
  idEvent: '',
  setApiUrl: (baseURL: string) => {},
  setShowSnackbar: (show: boolean) => {},
  setMessageSnackbar: (message: string) => {},
  setUserSession: (userSession: User) => {},
  setIdCountry: (id: number) => {},
  setIdEvent: (id: string) => {}
});

export default ApiContext;

export const useAppContext = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

export const AppProvider = ({children}: any) => {
  const [apiUrl, setApiUrl] = React.useState('https://api2.primetix.fun');
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [messageSnackbar, setMessageSnackbar] = React.useState('');
  const [userSession, setUserSession] = React.useState<User>();
  const [uuid] = React.useState(new DeviceUUID().get());
  const [idCountry, setIdCountry] = React.useState(1);
  const [idEvent, setIdEvent] = React.useState('');

  React.useEffect(() => {
    const session = secureLocalStorage.getItem('userSession') as User;
    setUserSession(session);
  }, []);

  return (
    <ApiContext.Provider
      value={{
        apiUrl,
        showSnackbar,
        messageSnackbar,
        uuid,
        userSession,
        idCountry,
        idEvent,
        setMessageSnackbar,
        setShowSnackbar,
        setApiUrl,
        setUserSession,
        setIdCountry,
        setIdEvent
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
