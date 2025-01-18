import { createClient } from "@hey-api/client-fetch";
import { Exports } from "./export";
import { Designs } from "./designs";
import { Users } from "./user";
import { BACKEND_HOST } from "src/config";

export * from "./auth";
export * from "./designs";

export type Services = {
  exports: Exports;
  users: Users;
  designs: Designs;
};

export function getUserClient() {
  const localClient = createClient({
    credentials: "include",
    baseUrl: BACKEND_HOST,
  });

  localClient.interceptors.response.use((res) => {
    const requestId = res.headers.get("x-request-id");
    if (res.status >= 400) {
      console.warn(
        `Response status ${res.status} on ${res.url}: request id: ${requestId}}`,
      );
    } else {
      console.log(
        `Response status ${res.status} on ${res.url}: request id: ${requestId}`,
      );
    }
    return res;
  });

  return localClient;
}

export const installServices = (): Services => {
  const client = getUserClient();
  const designs = new Designs(client);
  const exports = new Exports(client);
  const users = new Users(client);

  return {
    exports,
    users,
    designs,
  };
};
