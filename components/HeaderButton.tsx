import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../cache/store'; 
import { getMarketItems, setShouldFetch } from '../cache/slices/marketItemSlice';
import { pushNotifications } from '../backgroundTasks/pushNotifications';
import agent from '../Api/agent';
import NetInfo from '@react-native-community/netinfo';


const HeaderButton = () => {
    const dispatch = useAppDispatch();
    const {shouldFetch, loading} = useAppSelector((state) => state.marketItems);
    const {expoPushToken, notification} = pushNotifications();

    


    const handlePress = async () => {
        const netState = await NetInfo.fetch();

        if(expoPushToken !== undefined && netState.isConnected) {
            agent.sendTokenToServer.send(expoPushToken).then(() => {
                console.log('Push token sent successfully');
            })
            .catch((error) => {
                console.error('Failed to send push token:', error);
            });

            dispatch(setShouldFetch(true));
        }

        
        dispatch(getMarketItems());
    
    }

    
    return (
        <View style={styles.button}>
            <Button
                onPress={handlePress}
                title="Reload"
                color="#56BC5B"
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 20,
    },
});

export default HeaderButton;