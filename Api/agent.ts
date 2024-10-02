import axios, { AxiosError, AxiosResponse } from "axios";
import {ExpoPushToken } from "expo-notifications";
import { usesettingsStore } from "../cache/settings";


const serverIp = usesettingsStore.getState().serverIp;


axios.interceptors.response.use(
    (response) => {
      
      return response;
    },
    async (error: AxiosError) => {
     
        
    if (error.response) {
        const { status } = error.response;
        console.error(`Error ${status}:`, error.response.data);
      } else {
        console.error("Network or Server error:", error.message);
      }
       
      return Promise.reject(error.response);
    }
);


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

