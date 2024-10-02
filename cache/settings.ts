import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {create} from 'zustand';


interface settingsState {
    serverIp: string | undefined;
    setIpAddress: (ipAddress: string) => void;
    loadIpAddress: () => void;
}

const initialState = {
    serverIp: undefined
}

export const usesettingsStore = create<settingsState> ((set) => ({
    serverIp: initialState.serverIp,

    setIpAddress: (ipAddress: string) => {
        set({ serverIp: ipAddress });
        AsyncStorage.setItem('ipAddress', ipAddress); // Save to AsyncStorage
        axios.defaults.baseURL = `http://${ipAddress}:6553`
        console.log(ipAddress);
    },

    loadIpAddress: async () => {
        const savedIpAddress = await AsyncStorage.getItem('ipAddress');
        console.log("savedIPADress:", savedIpAddress);
        axios.defaults.baseURL = `http://${savedIpAddress}:6553`
        if (savedIpAddress) {
            set({ serverIp: savedIpAddress });
        }
    }
}))

