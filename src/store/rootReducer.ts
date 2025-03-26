import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import filterReducer from './slice/filterSlice';
import cartReducer from './slice/cartSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    filter: filterReducer,
    cartReducer,

});

export default rootReducer;
