
// possibly apply different structre to this 

import { useState, useEffect, useRef } from 'react';
import { Platform} from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
// import { useAppDispatch } from '../cache/store';
// import { setShouldFetch } from '../cache/slices/marketItemSlice';





export interface PushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}
export const pushNotifications = (): PushNotificationState => {
    //const dispatch = useAppDispatch();
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldSetBadge: true,
            shouldShowAlert: true
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<
        Notifications.ExpoPushToken | undefined>();
    
    const [notification, setNotification] = useState<
        Notifications.Notification | undefined>();
        
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    async function registerForPushNotificationsAsync () {
        let token;

        if(Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();

            let finalStatus = existingStatus;
            
            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                alert("Failed to get push token");
            }

            
         
            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            if (Platform.OS === 'android' ) {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231f7C',
                })
            }

            return token;

        }else {
            console.log("Error: Using emulator.")
        }


    }

    useEffect(() => {

        
    
        registerForPushNotificationsAsync().then((token) => {
            setExpoPushToken(token);
        });


        notificationListener.current = 
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
                //dispatch(setShouldFetch(true));
                //console.log("Here from addNotificationReceivedListener");
            });

        responseListener.current = 
            Notifications.addNotificationResponseReceivedListener((response) => {
                console.log(response);
            });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            )

            Notifications.removeNotificationSubscription(responseListener.current!);
        }
    }, []);

    return {
        expoPushToken,
        notification
    }
}   


