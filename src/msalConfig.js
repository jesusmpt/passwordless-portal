const msalConfig = {
  auth: {
    clientId: "b151075c-0779-42c2-b7aa-fa1bc6c36bd5",
    authority: "https://login.microsoftonline.com/9ff87f7c-8358-46b5-88bc-d73c09ce789f",
    redirectUri: "https://orange-bush-0ee8dca03.3.azurestaticapps.net"
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false
  }
};
export default msalConfig;
