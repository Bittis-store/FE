import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    receiverInfo: {
        customer: {
            name: string;
            phone: string;
            email: string;
        };
        addReceiver: {
            name: string;
            phone: string;
            email: string;
        };
    };
    shippingAddress: {
        serviceId: number;
        provinceId: number | null;
        province: string;
        district: string;
        districtId: number | null;
        wardCode: string;
        ward: string;
        address: string;
    };
    shippingFee: number;
    tax: number;
    description: string;
};

const initialState: InitialState = {
    receiverInfo: {
        customer: {
            name: '',
            phone: '',
            email: '',
        },
        addReceiver: {
            name: '',
            phone: '',
            email: '',
        },
    },
    shippingAddress: {
        serviceId: 53320,
        provinceId: null,
        province: '',
        districtId: null,
        district: '',
        wardCode: '',
        ward: '',
        address: '',
    },
    shippingFee: 0,
    tax: 0,
    description: '',
};

export const shippingSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setReceiver: (state, action) => {
            state.receiverInfo.customer = action.payload.customer;
            state.receiverInfo.addReceiver = action.payload.receiver;
        },

        setShippingAddress: (state, action) => {
            state.shippingAddress = { ...state.shippingAddress, ...action.payload };
        },

        setDescription: (state, action) => {
            state.description = action.payload.description;
        },
        setShippingFee: (state, action) => {
            state.shippingFee = action.payload;
        },
        clearCheckoutInfo: (state) => {
            state.description = '';
            state.shippingFee = 0;
            state.receiverInfo = { ...initialState.receiverInfo };
            state.shippingAddress = { ...initialState.shippingAddress };
        },
    },
});

export const { setReceiver, setShippingAddress, setDescription, setShippingFee, clearCheckoutInfo } =
    shippingSlice.actions;

export default shippingSlice.reducer;
