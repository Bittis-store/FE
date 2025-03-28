import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './slice/cartSlice';
import authReducer from './slice/authSlice';
import filterSlice from '~/store/slice/filterSlice';
import orderReducer from './slice/orderSlice';

const rootReducer = combineReducers({
    cartReducer,
    auth: authReducer,
    filter: filterSlice,
    order: orderReducer,
});

export default rootReducer;
