import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../../Api/agent'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import marketItem from '../../models/marketItem';
import { RootState } from '../store';
import NetInfo from '@react-native-community/netinfo';


export interface marketItemState {
    marketItems: marketItem[] | null;
    loading: boolean;
    error: null | string;
    shouldFetch: boolean;
}

const initialState: marketItemState = {
    marketItems: null,
    loading: false,
    error: null,
    shouldFetch: false
}

export const getMarketItems = createAsyncThunk(
    'marketItemState/getFromAsyncStorage',
    async (_, {getState, rejectWithValue}) => {
        
        try {
            const marketItemsState = (getState() as RootState).marketItems;

            const netState = await NetInfo.fetch(); // Check network state
            
            if (!netState.isConnected) {
                console.warn("You are offline. Using cached data.");
                // If offline, use cached data
                const cachedMarketItems = await AsyncStorage.getItem('marketitems');
                return cachedMarketItems ? JSON.parse(cachedMarketItems) : [];
            }
            
            if (marketItemsState.shouldFetch) {
                
                const response = await agent.getMarketItems.marketitems();
                await AsyncStorage.setItem('marketitems', JSON.stringify(response.marketItems));
                console.log("ShouldFetch: ", marketItemsState.shouldFetch);
                console.log("Fetching... ", response.marketItems);
                
                return response.marketItems;
            } else {
                console.log("ShouldFetch: ", marketItemsState.shouldFetch);
                const cachedMarketItems = await AsyncStorage.getItem('marketitems');
                console.log("Cached marketitems: ", cachedMarketItems)
                return cachedMarketItems ? JSON.parse(cachedMarketItems) : [];
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                const statusMessage = error.response.data.Status;
                if (statusMessage) {
                    return rejectWithValue(statusMessage);
                }
            }
            return rejectWithValue(error.message);
        }
    }
);

const marketItemSlice = createSlice({
    name: 'marketItemState',
    initialState,
    reducers: {
        setShouldFetch: (state, action) => {
            state.shouldFetch = action.payload;
            console.log("shouldFetch is set to:", action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMarketItems.pending, (state) => {
                if (!state.loading) {
                    state.loading = true;
                    state.error = null;
                }
            })
            .addCase(getMarketItems.fulfilled, (state, action) => {
                state.loading = false;
                state.marketItems = action.payload;
                state.shouldFetch = false;
            })
            .addCase(getMarketItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || null;
                state.shouldFetch = false;
            });
    }
});

export const { setShouldFetch } = marketItemSlice.actions;

export default marketItemSlice.reducer;
