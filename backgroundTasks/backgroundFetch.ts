// Register Notification Background Task



// --------------------------------------

// Currently not use full for project, not any plans including backgeround taks as it was originaly ment for notification
// after push notifications there is need 

// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';
// import agent from '../Api/agent';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import * as Notifications from 'expo-notifications';

// Notifications.setNotificationHandler({
//     handleNotification: async() => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// });

// const BACKGROUND_FETCH_TASK = 'background-fetch';

// TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
//     try {
        
//         const response = await agent.facebookMarketPlace.iphoneList();
//         const newResponse: facebookMarketplaceProduct[] = response.data;//
        
        
//         const storedData: string | null = await AsyncStorage.getItem('fbmk-iphones');
//         if(storedData !== null) {
//             const oldResponse: facebookMarketplaceProduct[] = JSON.parse(storedData); 
         
//             if(oldResponse[0].name?.toLowerCase() !== newResponse[0].name?.toLocaleLowerCase()) {
//                 scheduleNotification(newResponse[0].name!);
//             }
//         }

//         const serializedResponse = JSON.stringify(response.data);
//         await AsyncStorage.setItem('fbmk-iphones', serializedResponse);


//         console.log("bgfetch:", response);
//     } catch (error) {
//         console.log("Error: ", error );
//     }
    
//     return BackgroundFetch.BackgroundFetchResult.NewData;
// });

// async function registerBackgroundFetchAsync() {
//     return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
//         minimumInterval: 60,
//         stopOnTerminate: false,
//         startOnBoot: true,
//     });
// };

// async function unregisterBackgroundFetchAsync() {
//     return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
// }

// async function scheduleNotification(item: string) {
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             title: "Marketplace new item listed",
//             body: item,
//         },
//         trigger: null, // Show immediately
//     });
// }

// const BgFetch = {
//     unregisterBackgroundFetchAsync,
//     registerBackgroundFetchAsync,
//     BackgroundFetch,
//     TaskManager,
//     BACKGROUND_FETCH_TASK,
// }

// export default BgFetch;



