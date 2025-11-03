import React, { useEffect, useState } from 'react';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider, useMsal } from '@azure/msal-react';
import msalConfig from './msalConfig';
import { loginRequest, callGraphApi } from './graph';
import Step1CheckMFA from './components/Step1CheckMFA';
import Step2RegisterFIDO2 from './components/Step2RegisterFIDO2';
import Step3Complete from './components/Step3Complete';
const msalInstance = new PublicClientApplication(msalConfig);
function AppContent() {
  const { instance } = useMsal();
  const [account, setAccount] = useState(null);
  const [authMethods, setAuthMethods] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    const accts = instance.getAllAccounts();
    if (accts.length) setAccount(accts[0]);
  }, [instance]);
  const signIn = async () => {
    try {
      const resp = await instance.loginPopup(loginRequest);
      setAccount(resp.account);
      setMessage('Conectado como ' + resp.account.username);
    } catch (e) {
      console.error(e);
      setMessage('Error de inicio de sesión: ' + (e.message || e));
    }
  };
  const loadAuthMethods = async () => {
    setMessage('Cargando métodos de autenticación...');
    try {
      const resp = await instance.acquireTokenSilent(loginRequest);
      const data = await callGraphApi(resp.accessToken);
      setAuthMethods(data);
      setMessage('Se han encontrado ' + data.length + ' métodos registrados.');
    } catch (e) {
      console.error(e);
      setMessage('Error al cargar métodos: ' + (e.message || e));
    }
  };
  const hasFido = authMethods.some(m => m['@odata.type'] && m['@odata.type'].toLowerCase().includes('fido2'));
  const hasWhfb = authMethods.some(m => m['@odata.type'] && m['@odata.type'].toLowerCase().includes('windowshelloforbusiness'));
  return (
    <div className="container">
      <header><h1>Portal de Transición Passwordless</h1></header>
      {!account ? (
        <div className="center">
          <p>Para iniciar, pulse el siguiente botón y acceda con su cuenta corporativa.</p>
          <button className="btn" onClick={signIn}>Iniciar sesión con Entra ID</button>
        </div>
      ) : (
        <div>
          <p className="welcome">Bienvenido, <strong>{account.username}</strong></p>
          <p className="message">{message}</p>
          {!authMethods.length ? (
            <Step1CheckMFA onCheck={loadAuthMethods} />
          ) : hasFido || hasWhfb ? (
            <Step3Complete />
          ) : (
            <Step2RegisterFIDO2 onDone={() => setMessage('Si ya completó el registro, pulse "Comprobar".') } />
          )}
        </div>
      )}
      <footer><small>Soporte TI - Passwordless Program</small></footer>
    </div>
  );
}
export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AppContent />
    </MsalProvider>
  );
}
