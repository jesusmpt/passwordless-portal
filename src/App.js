import React from "react";
import { MsalProvider, useMsal, useIsAuthenticated } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig";
import Step1CheckMFA from "./components/Step1CheckMFA";
import Step2RegisterFIDO2 from "./components/Step2RegisterFIDO2";
import Step3Complete from "./components/Step3Complete";

const msalInstance = new PublicClientApplication(msalConfig);

function AuthenticatedApp() {
  const { accounts } = useMsal();
  const account = accounts[0];

  const [step, setStep] = React.useState(1);

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1 style={{ color: "#f36f21" }}>Portal Passwordless</h1>
      <h3>Bienvenido, {account?.username}</h3>
      {step === 1 && <Step1CheckMFA onNext={() => setStep(2)} />}
      {step === 2 && <Step2RegisterFIDO2 onNext={() => setStep(3)} />}
      {step === 3 && <Step3Complete />}
    </div>
  );
}

function AppContent() {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const handleLogin = () => {
    instance.loginPopup({
      scopes: ["User.Read"],
      prompt: "select_account",
    });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Portal de Transición a Passwordless</h2>
        <p>Inicia sesión con tu cuenta corporativa para comenzar.</p>
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: "#f36f21",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Iniciar sesión
        </button>
      </div>
    );
  }

  return <AuthenticatedApp />;
}

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <AppContent />
    </MsalProvider>
  );
}
