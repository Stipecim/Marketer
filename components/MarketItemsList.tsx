import React, { useEffect } from 'react';

import { View, Text, ActivityIndicator, Dimensions, ScrollView, StyleSheet} from 'react-native';

import { useAppDispatch, useAppSelector } from '../cache/store';
import { Card } from '@rneui/base';
import { getMarketItems } from '../cache/slices/marketItemSlice';
import timeAgo from '../util/timeAgo';

export const MarketItemsList = () => {
    const dispatch = useAppDispatch();
    const { marketItems, loading, error, shouldFetch } = useAppSelector(state => state.marketItems);

    useEffect(() => {
        dispatch(getMarketItems());
    }, [dispatch, shouldFetch]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <>
          {marketItems ? (
            <ScrollView>
              {marketItems.map(item => (
                <View key={item.id}>
                  <Card>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Divider />
                    <Text>Price: {item.price}</Text>
                    <Text>Location: {item.location}</Text>
                    <Text>Posted: <Text style={{ color: 'grey' }}>{timeAgo(item.timeFetched)}</Text></Text>
                    <Text>Platform: {item.platform}</Text>
                  </Card>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={styles.container}>
              <Text style={{ margin: 10 }}>No data available.</Text>
              {/*<Pressable style={styles.button} onPress={}>
                <Text style={styles.text}>Reload</Text>
              </Pressable>*/}
            </View>
          )}
        </>
      );

};

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
  
export default MarketItemsList;
