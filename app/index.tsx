
import { useEffect } from "react";

import React from "react";
import { usesettingsStore } from '../cache/settings';
import { pushNotifications } from '../backgroundTasks/pushNotifications';
import agent from '../Api/agent';



import MarketItemsList from "../components/MarketItemsList";
import { useAppDispatch } from "../cache/store";

// 1. token issue, token not being sent due to initial app start since it is not connected to server (serverIp = undefined)
// so app is not able to recieve any notification (possible solution: every reload send token for comparison)
// 2. add token initialisation here
// 3. unhandled rejection in Agent for 'send token' and 'get market items'
// 4. at times when server ip is provided Agent fails to aknowledge that, this might be due to loading too quickly or 
// async and sync code
// 5. look trough push notification and se what we can do with it, possible rearrangement


export default function App() {
    const {expoPushToken, notification} = pushNotifications();
    const notificationData = JSON.stringify(notification, undefined, 2);
    
    const loadSettings = usesettingsStore(state => state.loadIpAddress);

    const dispatch = useAppDispatch();


    // App State --------
    // const handleAppStateChange = (newState: AppStateStatus) => {
    //     console.log('App state changed to:', newState);
    //     if (newState === 'inactive') {
    //         dispatch(setShouldFetch(true));
    //     }   
    // };
    // ------------------
    
    useEffect(()=>{
        loadSettings();
        
        //const subscription = AppState.addEventListener('change', handleAppStateChange);
        
    
        if(expoPushToken !== undefined) 
            agent.sendTokenToServer.send(expoPushToken).then(() => {
                console.log('Push token sent successfully');
              })
              .catch((error) => {
                console.error('Failed to send push token');
              });

        return () => {
            //subscription.remove(); 
        };
    },[])

    
    return (
        <>
            <MarketItemsList/>
        </>
    );
}