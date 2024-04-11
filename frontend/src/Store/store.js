import { configureStore  } from '@reduxjs/toolkit' ;
import { userSlice } from '../Slices/userSlice.js';

export const mainstore = configureStore({
     reducer : {
        user : userSlice
     }
})