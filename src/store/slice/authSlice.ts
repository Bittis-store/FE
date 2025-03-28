import { IUser } from '~/types/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IinitialState = {
  authenticate: boolean
  user: IUser | null,
};
const initialState: IinitialState = {
  authenticate: false,
  user: null
};
const authSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    doLogin:(state, action: PayloadAction<any>)=>{
        state.authenticate = true,
        state.user = action.payload
    },
    doLogout: (state)=>{
        state.authenticate = false
        state.user = null
        localStorage.removeItem('token')
    }
  },
});
export const { doLogin, doLogout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
