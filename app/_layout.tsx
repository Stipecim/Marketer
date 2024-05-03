import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicon from '@expo/vector-icons/Ionicons';

import { Switch, View, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import BgFetch from '../backgroundTasks/backgroundFetch';
import { BackgroundFetchStatus } from 'expo-background-fetch';

export default function RootLayout() {
    const [isEnabled, setIsEnabled] = useState(false);
   

    // background state checking state //
    const [isRegistered, setIsRegistered] = useState(false);
    const [status, setStatus] = useState<BackgroundFetchStatus | null>(null);


    useEffect(()=> {
        checkStatusAsync();
    }, []);
    

    const checkStatusAsync = async () => {
        const status = await BgFetch.BackgroundFetch.getStatusAsync();
        const isRegistered = await BgFetch.TaskManager.isTaskRegisteredAsync(BgFetch.BACKGROUND_FETCH_TASK);
        setStatus(status);
        setIsRegistered(isRegistered);
        setIsEnabled(isRegistered);
        console.log("isRegistered:", isRegistered);
        console.log("status:", status);
    };


    const toggleFetchTask = async () => {
        if (isRegistered) {
          await BgFetch.unregisterBackgroundFetchAsync();
          console.log("unregistered");
        } else {
          await BgFetch.registerBackgroundFetchAsync();
          console.log("registered");
        }
    
        checkStatusAsync();
    };

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer>
                <Drawer.Screen name='index' options={{
                    title: 'Marketer',
                    headerRight: () => (
                        <View style={styles.container}>
                            <Switch 
                                trackColor={{false: '#767577', true: '#c1e6c3'}}
                                thumbColor={isEnabled ? '#9cd99f' : '#767577'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleFetchTask}
                                value={isEnabled}
                            />
                        </View>
                    ),
                    drawerIcon: ({size, color}) => (
                        <Ionicon name='home-outline' size={size} color={color}/>
                    )
                }} />
            </Drawer>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
  });