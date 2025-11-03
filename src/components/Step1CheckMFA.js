import React from "react";

export default function Step1CheckMFA({ onNext }) {
  return (
    <div>
      <h2>1️⃣ Verifica tu MFA</h2>
      <p>Confirma que tienes configurado Microsoft Authenticator o un método MFA válido.</p>
      <button onClick={onNext} style={btnStyle}>Continuar</button>
    </div>
  );
}

const btnStyle = {
  backgroundColor: "#f36f21",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

