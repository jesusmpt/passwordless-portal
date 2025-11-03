import React from "react";

export default function Step2RegisterFIDO2({ onNext }) {
  return (
    <div>
      <h2>2️⃣ Registra tu método Passwordless</h2>
      <p>Abre la app Authenticator o conecta tu llave de seguridad FIDO2.</p>
      <button onClick={onNext} style={btnStyle}>He completado este paso</button>
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
