import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IinitialState = {
    scroll: 'auto' | 'manual';
    location: number;
};

const initialState: IinitialState = {
    scroll: 'auto',
    location: 0,
};

const autoScrollToTopSlice = createSlice({
    name: 'autoScrollToTop',
    initialState,
    reducers: {
        setScroll(state, action: PayloadAction<IinitialState>) {
            state.location = action.payload.location;
            state.scroll = action.payload.scroll;
            console.log(action.payload);
        },
    },
});

export const { setScroll } = autoScrollToTopSlice.actions;
const autoScrollSlice = autoScrollToTopSlice.reducer;
export default autoScrollSlice;
