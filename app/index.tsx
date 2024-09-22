
import { useEffect } from "react";

import React from "react";
import agent from "../Api/agent";
import { pushNotifications } from "../backgroundTasks/pushNotifications";

import { AppState, AppStateStatus } from "react-native";
import { useAppDispatch } from "../cache/store";
import { setShouldFetch } from "../cache/slices/marketItemSlice";
import MarketItemsList from "../components/MarketItemsList";


export default function App() {
    const {expoPushToken, notification} = pushNotifications();
    const notificationData = JSON.stringify(notification, undefined, 2);
    //console.log(`${expoPushToken?.data}`);
    const dispatch = useAppDispatch();


    // App State --------
    const handleAppStateChange = (newState: AppStateStatus) => {
        console.log('App state changed to:', newState);
        if (newState === 'inactive') {
            dispatch(setShouldFetch(true));
        }   
    };
    // ------------------

   

   
     

    useEffect(() => {
        const subscription = AppState.addEventListener('change', handleAppStateChange);
        
    
        if(expoPushToken !== undefined) agent.sendTokenToServer.send(expoPushToken);

        return () => {
            subscription.remove(); 
        };
    }, [expoPushToken]);

    
    return (
        <>
            
            <MarketItemsList/>
        </>
    );
}