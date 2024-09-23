import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicon from '@expo/vector-icons/Ionicons';

import { StyleSheet } from 'react-native';

import React, { useEffect } from 'react';

import { Provider } from 'react-redux';
import { persistor, store } from '../cache/store';
import { PersistGate } from 'redux-persist/integration/react';
import HeaderButton from '../components/HeaderButton';
import { usesettingsStore } from '../cache/settings';

// 1. token issue, token not being sent due to initial app start since it is not connected to server (serverIp = undefined)
// so app is not able to recieve any notification (possible solution: every reload send token for comparison)
// 2. add token initialisation here
// 3. unhandled rejection in Agent for 'send token' and 'get market items'
// 4. at times when server ip is provided Agent fails to aknowledge that, this might be due to loading too quickly or 
// async and sync code
// 5. look trough push notification and se what we can do with it, possible rearrangement

export default function RootLayout() {
   
    const loadSettings = usesettingsStore(state => state.loadIpAddress);
    
    useEffect(()=>{
        loadSettings();
    },[])

    
    return (
        <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
            <Drawer>
                <Drawer.Screen name='index' options={{
                    title: 'Marketer',
                    drawerIcon: ({size, color}) => (
                        <Ionicon name='home-outline' size={size} color={color}/>
                    ),
                    headerRight:  () => <HeaderButton />,
                }} />
                <Drawer.Screen name='settings' options={{
                    title: 'Settings'
                }} />
            </Drawer>
            
        </GestureHandlerRootView>
        </PersistGate>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
    },
    button: {
        marginRight: 20
    }
  });