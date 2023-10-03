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

export function getDateInFormat(timestamp: number) {
  if (timestamp === 0) {
    return "";
  }

  const dateObj = new Date(timestamp);

  
  let days = dateObj.getDay();
  let day = "";
  switch (days) {
    case 0:
      day = "Sun";
      break;
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thrs";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
  }

  let date = dateObj.getDate();
  let months = dateObj.getMonth();
  let month = "";
  switch (months) {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
      break;
  }

  let properDate: string = day + ", " + date + " " + month;
  return properDate;
}
