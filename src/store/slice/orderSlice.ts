import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVoucher } from '~/types/Voucher';

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
    paymentMethod: 'COD' | 'ONLINE';
    tax: number;
    description: string;
    totalPrice: number;
    voucher: IVoucher | null;
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
    paymentMethod: 'COD',
    shippingFee: 30000,
    tax: 0,
    description: '',
    totalPrice: 0,
    voucher: null,
};

export const shippingSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        changeVoucher: (state, action: PayloadAction<IVoucher>) => {
            state.voucher = action.payload;
        },
        removeVoucher: (state) => {
            state.voucher = null;
        },
        setCheckOutTotalPrice: (state, action: PayloadAction<number>) => {
            state.totalPrice = action.payload;
        },
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
        setPaymentMethood: (state, action: PayloadAction<'COD' | 'ONLINE'>) => {
            state.paymentMethod = action.payload;
        },
        resetOrderInformation: (state) => {
            state.description = '';
            state.shippingFee = 30000;
            state.description = '';
            state.paymentMethod = 'COD';
            state.receiverInfo = { ...initialState.receiverInfo };
            state.shippingAddress = { ...initialState.shippingAddress };
            state.voucher = null;
        },
    },
});

export const {
    setReceiver,
    setCheckOutTotalPrice,
    changeVoucher,
    removeVoucher,
    setPaymentMethood,
    setShippingAddress,
    setDescription,
    setShippingFee,
    clearCheckoutInfo,
    resetOrderInformation,
} = shippingSlice.actions;

export default shippingSlice.reducer;
