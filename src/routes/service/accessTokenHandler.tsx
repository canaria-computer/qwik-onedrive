// src\routes\service\accessTokenHandler.tsx
import { component$, useContext, useOnWindow, $, Slot } from "@builder.io/qwik";
import { AccessTokenCTX } from "./store";
import msalConfig, { silentRequests } from "~/utils/msal";
import { PublicClientApplication } from "@azure/msal-browser";

export default component$(() => {
  const store = useContext(AccessTokenCTX);

  useOnWindow(
    "DOMContentLoaded",
    $(async () => {
      const msalInstance = new PublicClientApplication(msalConfig);
      // if (!msalInstance) return;
      await msalInstance.initialize();
      const isSuccess = await msalInstance
        .handleRedirectPromise()
        .then((res) => {
          if (res) {
            store.accessToken = res.accessToken;
            return true;
          } else {
            return false;
          }
        });
      if (isSuccess) return;

      await msalInstance.loginRedirect(silentRequests);
      await msalInstance.ssoSilent(silentRequests);
      const account = msalInstance.getAllAccounts();
      if (account.length > 0) {
        msalInstance
          .acquireTokenSilent({
            ...silentRequests,
            account: account[0],
          })
          .then((response) => {
            store.accessToken = response.accessToken;
          })
          .catch(() => {
            msalInstance.loginRedirect(silentRequests);
          })
          .catch((err) => {
            console.error("Error acquiring token: ", err);
          });
      }
    }),
  );

  return <Slot />;
});
