import  Constants  from "expo-constants";
import axios, { AxiosResponse } from "axios";
import {ExpoPushToken } from "expo-notifications";

axios.defaults.baseURL = ""; // fetch address needed  // need the env file 

// interceptor, new lines for push tokens 
// more api fetch 

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
}

const facebookMarketPlace = {
    list: () => requests.get("iphoneproducts").then(responseBody),
}

const sendTokenToServer = {
    send: (token: ExpoPushToken) => requests.post("postToken", {token}),
}

const agent = {
    facebookMarketPlace,
    sendTokenToServer,
}

export default agent;

