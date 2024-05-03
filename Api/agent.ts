import  Constants  from "expo-constants";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = ""; // before fore fetch address needed 



const responseBody = (response: AxiosResponse) => response.data;

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
}

const facebookMarketPlace = {
    list: () => request.get("iphoneproducts"),
}

const agent = {
    facebookMarketPlace,
}

export default agent;