import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../cache/store'; // Adjust this import based on your store location
import { getMarketItems, setShouldFetch } from '../cache/slices/marketItemSlice';

const HeaderButton = () => {
    const dispatch = useAppDispatch();
    const {shouldFetch, loading} = useAppSelector((state) => state.marketItems);

    return (
        <View style={styles.button}>
            <Button
                onPress={() => {
                   dispatch(setShouldFetch(true));
                   dispatch(getMarketItems());
                }}
                title="Reload"
                color="#56BC5B"
                disabled={loading}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 20,
    },
});

export default HeaderButton;