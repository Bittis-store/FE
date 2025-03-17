import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import filterReducer from './slice/filterSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    filter: filterReducer,
});

export default rootReducer;
