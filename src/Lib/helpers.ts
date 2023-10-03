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
      authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(body),
  });
}

/**
 * Hook that performs a network request based on the dependency array and calls the callback with the response.
 * By default, it will run only on mount.
 *
 * @param method "GET","POST";
 * @param endpoint  the endpoint you want to request at (with /)
 * @param body  the object we want to send in the request without stringification
 * @param callback function to be called as callback with the request's response as argument
 * @param dependencies react's native dependency array
 */
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
