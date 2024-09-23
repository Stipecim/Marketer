import AsyncStorage from "@react-native-async-storage/async-storage";
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
        console.log(ipAddress);
    },

    loadIpAddress: async () => {
        const savedIpAddress = await AsyncStorage.getItem('ipAddress');
        console.log(savedIpAddress);

        if (savedIpAddress) {
            set({ serverIp: savedIpAddress });
        }
    }
}))

