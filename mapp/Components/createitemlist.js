import React ,{useState} from "react";
import {SafeAreaView, TextInput, StyleSheet, Button, View, Alert} from "react-native";
import { WriteToJSON } from "../utils/fetchjson";

const CreateItemList = ({state , onStateChange}) => {
    const [pressedState, setpressedState] = useState(state);
    const [textValue, setTextValue] = useState('');
    console.log(pressedState);
    const handlePressIn = () => {
        if(textValue.trim() === '') {
            Alert.alert('Error', 'Input cannot be empty ');
        }
        else {
            const object = [{
                name: textValue,
                array: []
            }]
            WriteToJSON(object);
            onStateChange();
        }
    }

    const handlePressOut = () => {
        
    }
    return (
        pressedState && (
            <SafeAreaView style={styles.container}>
                <TextInput 
                    style={styles.tInput}
                    placeholder="Name of Item list ?"
                    onChangeText={(text) => setTextValue(text)}
                    />
                <View style={styles.btn} >
                    <Button
                        title="Create"
                        onPress={handlePressIn}/>
                </View>

            </SafeAreaView>
        )
    );
}

const styles = StyleSheet.create ({
    container: {
        flexDirection: 'column',
        width: 300,
        height: 150,
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgb(219, 146, 86)',
        borderRadius: 20,
        backgroundColor: 'white',
        transform: [{ translateY: -250 }, { translateX: 60 }]
    },
    tInput: {
        borderWidth: 2,
        borderColor: 'black',
        top: 20,
        width: '90%'
    },
    btn: {
        marginTop: 30,
        width: '90%',
        
    }
    
})
export default CreateItemList;