import React from "react";
import {StyleSheet, Text, View,} from 'react-native';

import { isIOS, isAndroid } from "../utils/platformck";

const Header = ({ title })=> {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>Marketer.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      flexDirection: 'row',
      top: 0,
      width: '100%',
      height: 80,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(254, 186, 145, 1)',
      ...isAndroid && {
        elevation: 10
      },
      ...isIOS && {
        borderBottomColor: 'rgba(0,0,0, 0.5)',
        borderBottomWidth: 4
      },
      //IOS
      paddingTop: isIOS? 20 : 0 
    },
    text: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000000'
    }
  });

export default Header;