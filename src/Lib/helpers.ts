import { useEffect } from "react";

const BASE_URI = "http://localhost:4000";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function networkRequest(
  method: Method,
  endpoint: string,
  body: { [key: string]: any } | undefined
) {
  return fetch(BASE_URI + endpoint, {
    method: method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export function useNetworkRequest(
  method: Method,
  endpoint: string,
  body: { [key: string]: any } | undefined,
  callback: (value: Response) => any,
  dependencies: any[] = []
) {
  useEffect(() => {
    networkRequest(method, endpoint, body).then(callback);
  }, dependencies);
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
