// src/utils/client-utils.ts
import { noSerialize } from "@builder.io/qwik";
import { Client } from "@microsoft/microsoft-graph-client";

export const createGraphClient = (accessToken: string | null) =>
  noSerialize(
    Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    })
  );
