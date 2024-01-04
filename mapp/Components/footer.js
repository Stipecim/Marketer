import React , {useState, useEffect}from "react";
import {StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { isIOS, isAndroid } from "../utils/platformck";


import IcoCreate from "../assets/ico/icons8-add-60(-xhdpi).png";
import CreateItemList from "./createitemlist";
import {requestPermission} from '../utils/permission';
const FunctionalFooter = () => {
    const [pressedState, setpressedState] = useState(false);

    const handlePressIn = async () => {
        const response = await requestPermission();
        if(pressedState)
            setpressedState(false);
        else
            setpressedState(true);   
    }

    const handlePressOut = () => {
        
    }
    return (
        <View>
        <View style={styles.bottom}>
            <TouchableOpacity onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Image 
                    source={IcoCreate}
                    style={{width: 45, height: 45, borderRadius: 10 }}/>
            </TouchableOpacity>
        </View>
            {pressedState && (

                <CreateItemList state={pressedState} onStateChange={handlePressIn}/>                                
            )}
        </View>
        
    );
}

const styles = StyleSheet.create({
    bottom: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        width: '100%',
        backgroundColor: 'rgba(254, 186, 145, 1)',
        height: 60,
        justifyContent: "center",
        alignItems: 'center',
        
        ...isAndroid && {
           elevation: 10,
           borderTopColor: 'rgba(0,0,0, 0.4)',
           borderTopWidth: 10 
          },
          ...isIOS && {
            borderTopColor: 'rgba(0,0,0, 0.5)',
            borderTopWidth: 4
          }
    }
}) 
export default FunctionalFooter;