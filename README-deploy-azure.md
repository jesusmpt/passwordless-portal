# Guía de despliegue (español) — Passwordless Portal

Esta guía explica **paso a paso** cómo desplegar este portal en **Azure Static Web Apps** y conectarlo con **Entra ID (Azure AD)**. Está pensada para usuarios sin experiencia técnica.

## Requisitos previos
- Cuenta con permisos para crear App Registrations en Entra ID y para crear recursos en Azure (Application Administrator / Owner).
- Una cuenta de GitHub (para despliegue automático).

---
## Paso 1 — Subir el código a GitHub
1. Cree un repositorio nuevo en GitHub (por ejemplo `passwordless-portal`).
2. Suba todos los archivos del ZIP a la rama `main`. Puede usar la opción **Add file -> Upload files** en la web.

**Captura sugerida:** pantalla del repo con los archivos listados.

---
## Paso 2 — App Registration en Entra ID
1. Acceda al portal Entra: https://entra.microsoft.com
2. Navegue a **App registrations** -> **New registration**.
   - Nombre: PasswordlessPortal
   - Tipos de cuenta: Cuentas en este directorio organizativo
   - Redirect URI (web): https://orange-bush-0ee8dca03.3.azurestaticapps.net
3. Pulse **Register**.
4. Copie **Application (client) ID** y **Directory (tenant) ID**.
5. En **Authentication** añada la Redirect URI exacta si no está y active **ID tokens**.
6. En **API permissions** añada **Microsoft Graph -> Delegated Permissions**: `User.Read` y `UserAuthenticationMethod.Read` y conceda **Grant admin consent**.

**Captura sugerida:** pantalla con Client ID y Tenant ID visibles.

---
## Paso 3 — Conectar GitHub con Azure Static Web Apps
1. Vaya al Portal de Azure -> **Static Web Apps** -> **Create**.
2. En Deployment details elija **GitHub** y conecte su cuenta.
3. Seleccione su repositorio `passwordless-portal` y la rama `main`.
4. App location: `/`  Output location: `build`.
5. Pulse **Review + Create** y luego **Create**.

Azure creará un workflow en `.github/workflows/` (ya incluido en este repositorio). En el primer despliegue se le pedirá crear un secreto en GitHub (AZURE_STATIC_WEB_APPS_API_TOKEN). Siga las instrucciones en la pantalla.

**Captura sugerida:** pantalla Create Static Web App con el repo seleccionado.

---
## Paso 4 — Configurar la autenticación en la Static Web App
1. Una vez creada, abra el recurso Static Web App en Azure.
2. En el menú, vaya a **Authentication**.
3. Añada un Identity Provider -> **Microsoft**.
   - Client ID: b151075c-0779-42c2-b7aa-fa1bc6c36bd5 (ya incluido en la app)
   - Client secret: cree un client secret en la App Registration y pegue aquí.
   - Issuer URL: https://login.microsoftonline.com/9ff87f7c-8358-46b5-88bc-d73c09ce789f/v2.0
4. Guarde la configuración.

**Captura sugerida:** pantalla Authentication con el provider Microsoft configurado.

---
## Paso 5 — Probar la app
1. Abra la URL de la Static Web App: https://orange-bush-0ee8dca03.3.azurestaticapps.net
2. Haga clic en **Iniciar sesión con Entra ID**. Se abrirá la pantalla de Azure AD.
3. Si el usuario tiene métodos passwordless, la app lo mostrará; si no, guiará por los pasos.

**Captura sugerida:** pantalla del portal y luego la solicitud de login de Azure.

---
## Notas y resolución de problemas
- Si obtienes `redirect_uri_mismatch`, revisa que la Redirect URI en App Registration coincida exactamente con la URL.
- Si ves errores de permisos para Graph, asegúrate de que **admin consent** fue concedido para `UserAuthenticationMethod.Read`.
- Para reconstruir localmente use `npm install` y `npm run build`.

---
Si quieres, puedo ayudarte a ejecutar la primera integración en tu tenant paso a paso.
