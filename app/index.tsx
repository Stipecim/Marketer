
import { Card } from "@rneui/base";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import agent from "../Api/agent";
import { pushNotifications } from "../backgroundTasks/pushNotifications";


export default function App() {

    const {expoPushToken, notification} = pushNotifications();

    const data = JSON.stringify(notification, undefined, 2);
    console.log(`${expoPushToken?.data}`);

   // NEW LOGIC NEEDS TO BE APPLIED !!! 


    // const [data, setData] = useState<facebookMarketplaceProduct[] | null>(null);
    // const [loading, setLoading] = useState(false);

    // //const [request, setRequest] = useState("empty");

    useEffect(() => {
        if(expoPushToken !== undefined) agent.sendTokenToServer.send(expoPushToken);
    }, [expoPushToken]);

    // async function GetIphonesFromStorage() {
    //     try {
    //         setLoading(true);
    //         const response = await AsyncStorage.getItem('fbmk-iphones');
    //         if (response !== null) {
    //             const parsedData: facebookMarketplaceProduct[] = JSON.parse(response);
    //             setData(parsedData);
    //             console.log("Getting Stored Data:", parsedData);
    //         }else{
    //             // attempt fetch
    //             const newResponse = await agent.facebookMarketPlace.list();
    //             const Data: facebookMarketplaceProduct[] = newResponse.Data;
    //             setData(Data);
    //             // const serializedResponse = JSON.stringify(newResponse);
    //             // setRequest(serializedResponse);
    //          }
            
            
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.log("Error fetching from storage:", error);
    //     }
    // }

    // if (loading) {
    //     return <Text>Loading...</Text>;
    // }

    // console.log("Data:", data )
    // if (data === null || data === undefined) {
    //     return (
    //         <>
    //         <View style={styles.container}>
    //             <Text style={{margin: 10}}>No data available press the switch and close the app</Text>
    //             <Pressable style={styles.button} onPress={() => GetIphonesFromStorage()}>
    //                 <Text style={styles.text}>Reload</Text>
    //             </Pressable>
    //         </View>
    //         </>
    //     );
    // }


    // return (
    //     <ScrollView>
    //         {data.map(item => (
    //             <View key={item.id}>
    //                 <Card>
    //                     <Card.Title>{item.name}</Card.Title>
    //                     <Card.Divider />
    //                     <Text>Price: {item.price}</Text>
    //                     <Text>Location: {item.location}</Text>
    //                 </Card>
    //             </View>
    //         ))}
    //     </ScrollView>
    // );

    return (
        <View style={styles.container}>
            <Text>Token: {expoPushToken?.data ?? ""}</Text>
            <Text>{data}</Text>
        </View>
    )
}

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10, // Decreased padding to fit smaller screens
        paddingHorizontal: 24, // Decreased padding to fit smaller screens
        borderRadius: 8, // Increased border radius for a more rounded button
        elevation: 3,
        backgroundColor: 'black',
        width: screenWidth * 0.4,
      },
      text: {
        fontSize: 14, // Decreased font size for better readability on smaller screens
        lineHeight: 18, // Decreased line height for better text alignment on smaller screens
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });