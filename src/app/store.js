import { configureStore } from '@reduxjs/toolkit';
import demoReducer from '../demoSlice'

export const store = configureStore({   
    reducer: {
        demo: demoReducer,
    },
});
export default store;
