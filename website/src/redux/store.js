import { configureStore } from '@reduxjs/toolkit'

import { authReducer } from './slices/auth';
import { peopleReducer } from './slices/people';

const store = configureStore({
    reducer: {
        people: peopleReducer,
        auth: authReducer
    }
});

export default store;