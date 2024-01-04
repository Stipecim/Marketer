
import Items from '../data/itemlist.json';
import React, {useEffect} from 'react';
import * as ScopedStorage from "react-native-scoped-storage";

export const WriteToJSON = async (itemList)=> {
   
        const writeDataToFile = async () => {
          try {
            console.log('heeey!!!');
            const newList = [...Items, itemList];
            console.log(newList);
            await ScopedStorage.writeFile('../data/itemlist.json', JSON.stringify(newList), 'itemlist.json', 'application/json', 'utf8', false);
            console.log('Array successfully added');
          } catch (error) {
            console.error('Error updating objects', error);
          }
        };
    
        writeDataToFile();
      
}



