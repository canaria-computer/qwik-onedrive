import type { Configuration } from "@azure/msal-browser";
const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.PUBLIC_CLIENT_ID,
    authority: `https://login.microsoftonline.com/consumers/${import.meta.env.PUBLIC_ENTER_TENANT_ID}`,
    // redirectUri: import.meta.env.PUBLIC_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "sessionStorage",
  },
};

export default msalConfig;

export const silentRequests = {
  scopes: ["Files.Read"],
};
