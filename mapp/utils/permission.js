import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

export const requestPermission= () => {
    
    
    
    
    const checkPermissionStatus = async (permission) => {
        try {
            
            const status = await PermissionsAndroid.check(permission);

            if(status) {
                console.log('Permission already grandted.');
            }
            else {
                console.log('Permission not granted. Requesting...');
                requestPermissionWriteToStorage(permission);
            }
        }catch(error) {
            console.error('Error checking permission status', error);
        }
    }
    
    
    
    
    
    const requestPermissionWriteToStorage = async (permission) => {
        try { 
            const request = await PermissionsAndroid.request(
                permission,
                {
                    title: 'Request for permission',
                    message: 'Marketer app needs to acces your local storage' +
                    ' in order to work.',
                    buttonPositive: 'Yes',
                    buttonNegative: 'No'

                }
            )

        }catch (err ) {
            console.warn(err);
        }
    }

    
    checkPermissionStatus(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    checkPermissionStatus(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

}

