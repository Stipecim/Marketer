import  Constants  from "expo-constants";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://84.64.67.3:6553"; // before fore fetch address needed 



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