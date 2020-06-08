import axios, { AxiosResponse } from "axios";
import { history } from "App";
import MockAdapter from "axios-mock-adapter";
import { storage } from "./storage";

const fetch = axios.create({
  //baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    //csrf: "token",
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods":" GET, PUT, POST, DELETE, OPTIONS",
  },
  
  withCredentials: true,
  
});

/// TODO REMOVE !!! ONLY FOR TEST
// var mock = new MockAdapter(fetch);
// // Mock any GET request to /users
// // arguments for reply are (status, data, headers)
// mock.onPost("/login").reply(200, {
//   username: "John Smith"
// });
// mock.onGet("/customers").reply(200, [
//   { id: 1, code: "c1", description: "d1" },
//   { id: 2, code: "c2", description: "d2" },
//   { id: 3, code: "c3", description: "d3" },
//   { id: 4, code: "c4", description: "d4" }
// ]);
// mock.onGet("/selectcustomers").reply(200, [
//   { value: 1, label: "d1" },
//   { value: 2, label: "d2" },
//   { value: 3, label: "d3" },
//   { value: 4, label: "d4" }
// ]);
// mock.onGet("/customersSubCustomers", { params: { customerId: 1 }}).reply(200, [
//   { id: 1, code: "sc1", description: "sd21" },
//   { id: 2, code: "sc2", description: "sd22" },
//   { id: 3, code: "sc3", description: "sd23" },
//   { id: 4, code: "sc4", description: "sd24" }
// ]);
// mock.onGet("/selectcustomerssubcustomers", { params: { customerId: 1 }}).reply(200, [
//   { value: 1, label: "sd21" },
//   { value: 2, label: "sd22" },
//   { value: 3, label: "sd23" },
//   { value: 4, label: "sd24" }
// ]);
// mock.onGet("/customersSubCustomers", { params: { customerId: 2 }}).reply(200, [
//   { id: 1, code: "sc21", description: "sd21" },
//   { id: 2, code: "sc22", description: "sd22" },
//   { id: 3, code: "sc23", description: "sd23" },
//   { id: 4, code: "sc24", description: "sd24" }
// ]);
// mock.onGet("/country", { params: {  }}).reply(200, [
//   { id: 1, code: "IT", description: "Italia" },
//   { id: 2, code: "DE", description: "Germania" },
//   { id: 3, code: "FR", description: "France" }
  
// ]);
// mock.onGet("documents/1/documentorders").reply(200, [
//   {
//     id: 1,
//     document: 1234,
//     product: 1,
//     unitOfMeasure: "start",
//     conversionQty: 1,
//     pieces: 2,
//     netWeight: 1.0,
//     grossWeight: 1.2,
//     volume: 1.0,
//     package: 1.1,
//   },
//   {
//     id: 2,
//     document: 1234,
//     product: 1,
//     unitOfMeasure: "start",
//     conversionQty: 2,
//     pieces: 2,
//     netWeight: 1.0,
//     grossWeight: 1.2,
//     volume: 1.0,
//     package: 1.1,
//   },
// ]);
// mock.onPost("/createPlace").reply(200, {
//   newPlaceCreated: true
// })

// mock.onPost("/register").reply(200, {
//   accountCreation: true
// });
/// TODO REMOVE !!! ONLY FOR TEST

const TokenResult = {
  Valid: 0,
  Expired: 1,
  Error: 2,
  NoToken: 3,
  Pending: 4,
};

export const TokenStatus ={
  OK: "OK",
  PENDING: "PENDING"
}


function handleSuccess(response: AxiosResponse<any>) {
  const token = response.headers["token"];
  if(token){
    storage.setAuthToken(token);
    const parsedToken = storage.getAuthTokenParsed();
    if(parsedToken!==null){
      if(parsedToken.status === TokenStatus.PENDING){
        history.push("/firstaccess?username=" + parsedToken.unique_name);
      }
    }
  }

  log(response);

  if(response.data?.token === TokenResult.NoToken){
    storage.clearAuthToken();
    history.push("/login");
  }

  return response;
}

function log(response: AxiosResponse<any>){
  console.groupCollapsed(`HTTP ${response.config.method} ${response.statusText}: ${response.config.url}`)

  console.groupCollapsed("request");
  console.debug("params", response.config.params);
  console.debug("body", response.config.data);
  console.debug("headers", response.config.headers);
  console.debug("baseUrl", response.config.baseURL);
  console.groupEnd()

  console.groupCollapsed("response");
  console.debug("body", response.data);
  console.debug("headers", response.headers);
  console.groupEnd()

  console.groupEnd()
}

function handleError(error: any) {
  console.error(error);
  switch (error.response.status) {
    case 401:
      if(error?.response?.data?.token === TokenResult.Expired){
        storage.clearAuthToken();
        history.push("/login");
      } else if(error?.response?.data?.token === TokenResult.Pending){
        history.push("/firstaccess?username=" + error?.response?.data?.username);
      }
      
      break;
    // case 404:
    //   history.push("/404");
    //   break;
    // default:
    //   history.push("/500");
    //   break;
  }
  return Promise.reject(error);
}

fetch.interceptors.request.use(
  config => {
    const token = storage.getAuthToken();
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

fetch.interceptors.response.use(handleSuccess, handleError);

export default fetch;
