import React from 'react';
export default function Step2RegisterFIDO2({onDone}) {
  return (
    <div>
      <h2>Paso 2 — Registrar FIDO2 o Microsoft Authenticator</h2>
      <p>Siga la guía de la empresa para registrar su llave FIDO2 o la app Microsoft Authenticator.</p>
      <p><a href="https://learn.microsoft.com/azure/active-directory/authentication/howto-authentication-passwordless-enable" target="_blank" rel="noreferrer">Guía oficial de Passwordless</a></p>
      <button className="btn" onClick={onDone}>He completado el registro</button>
    </div>
  );
}
