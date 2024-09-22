import axios, { AxiosResponse } from "axios";
import {ExpoPushToken } from "expo-notifications";

axios.defaults.baseURL = "http://192.168.1.53:6553"; // fetch address needed  // need the env file 

// interceptor, new lines for push tokens 
// more api fetch 

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
}

const getMarketItems = {
    marketitems: () => requests.get("/marketitems")
}

const sendTokenToServer = {
    send: (token: ExpoPushToken) => requests.post("/updatetoken", token),
}

const agent = {
    getMarketItems,
    sendTokenToServer,
}

export default agent;

