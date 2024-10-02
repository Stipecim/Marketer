import {Drawer} from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicon from '@expo/vector-icons/Ionicons';



import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store} from '../cache/store';
import { PersistGate } from 'redux-persist/integration/react';
import HeaderButton from '../components/HeaderButton';





export default function RootLayout() {
    
    
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