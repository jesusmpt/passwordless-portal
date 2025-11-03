import React from 'react';
export default function Step1CheckMFA({onCheck}) {
  return (
    <div>
      <h2>Paso 1 — Comprobar Microsoft Authenticator</h2>
      <p>Si ya tiene Microsoft Authenticator registrado, pulse el botón para verificar.</p>
      <button className="btn" onClick={onCheck}>Comprobar registro</button>
    </div>
  );
}
