import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { isAndroid, isIOS } from './utils/platformck';
import Header from './Components/header';
import NestedList from './Components/nestedlist';
import FunctionalFooter from './Components/footer';

//import NestedList from './Components/nlist'

import List from './data/itemlist.json';
import {WriteToJSON} from './utils/fetchjson';


const App = () => {
 
  
  return (
    <View style={styles.body}>
      <Header />
      <NestedList list={List}/>
      <FunctionalFooter />

      
    </View>
  );
};

const styles = StyleSheet.create ({
  body: {
    flex: 1 ,
    backgroundColor: '#FFC9A8',

  }
})
export default App;