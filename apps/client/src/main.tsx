import { createTRPCProxyClient } from "@trpc/client";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import "bootstrap/dist/js/bootstrap.bundle.js";
import React from "react";
import ReactDOM from "react-dom/client";
import type { AppRouter } from "server/dist/trpc/router";
import superjson from "superjson";
import App from "./App";
import "./index.scss";

let token: string | undefined;

export const resetToken = () => {
  localStorage.removeItem("token");
  token = undefined;
};

export const setToken = (newToken: string) => {
  localStorage.setItem("token", newToken);
  token = newToken;
};

export const getAuthorizationHeaders = () => {
  return {
    Authorization: `Bearer ${token || localStorage.getItem("token") || ""}`,
  };
};

export const client = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: "/trpc",
      maxURLLength: 95,
      // You can pass any HTTP headers you wish here
      async headers() {
        return {
          "Access-Control-Allow-Credentials": "true",
          ...getAuthorizationHeaders(),
        };
      },
    }),
  ],
});

const prepare = async () => {
  if (import.meta.env.DEV) {
    const { worker } = await import("./api");
    return worker.start({ onUnhandledRequest: "bypass" });
  }

  return Promise.resolve();
};

prepare().then(() =>
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
