// Componenst to Generate nested list based on json file content
import React, {useState, useEffect} from "react";
import {ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, SafeAreaView} from "react-native";


import Ico from '../assets/ico/icons8-folder-36.png';
import InfoIco from '../assets/ico/steepeitalicinfo.png'

const NestedList = ({item}) => {
    const hasChildren = item.array && item.array.length > 0;
    const [pressedState, setpressedState] = useState(false);

    
    const handlePressIn = () => {
        if(pressedState)
            setpressedState(false);
        else
            setpressedState(true);   
    }

    const handlePressOut = () => {
        
    }
    return (
        <View >
            <TouchableOpacity 
                
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={styles.item} >
    
                <Image 
                    source={Ico}
                    style={{width: 75, height: 75, borderRadius: 10}} />
                
                <Text style={styles.text2}>Name: {item.name}</Text>
            </TouchableOpacity>
            
            {hasChildren && pressedState && (
                <View>
                    {item.array.map((childitem, index) => {
                        
                        return(
                            <View style={{top: 0}} key={index}>
                                <View style={styles.child} >

                                    <Image
                                    source={InfoIco}
                                    style={{width: 60, height: 60, borderRadius: 10}}/>
                                    <View>
                                        <Text style={styles.text}>Name: {childitem.model}</Text>
                                        <Text style={styles.text}>Storage: {childitem.storage}</Text>
                                    </View>
                                    <Text style={styles.avgPrice}>Avreage Price: </Text>                               
                                </View>
                                <View style={styles.borderline}/> 
                            </View>
                        )
                    })}
                </View>
            )} 
        </View>
    );
}


const GenerateNestedList = ({list}) => {
    
    return (

        <SafeAreaView style={styles.scrollCotainer}>  
            <ScrollView style={styles.scrollCotainer}
                        contentContainerStyle={{flexGrow: 1}} >
            
                {list.map((item, index) => ( <NestedList key={index} item={item}/> ))}
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create ({
    item: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        top: 90,
        borderBottomColor:'black',
        borderBottomWidth: 1,
        backgroundColor: 'rgba(120, 120, 120, 0.5)'
        
    },
    text: {
        fontSize: 15,
        top: 10,
        marginLeft: 20,
        color: 'grey'
    },
    text2: {
        fontSize: 20,
        top: 25,
        marginLeft: 20,
        color: 'black'
    },
    avgPrice:{
        fontSize: 15,
        top: 30,
        marginLeft: 20,
        color: 'grey',
     },
    child: {
        flexDirection: 'row',
        width: '100%',
        height: 70,
        top: 95,
        borderBottomColor:'black',
        marginLeft: 20,
        
    },
    borderline: {
        width: "100%",
        borderBottomColor:'black',
        borderBottomWidth: 1,
        top: 20
        
    },
    scrollCotainer: {
        flex: 1
    }
    
})
export default GenerateNestedList;
