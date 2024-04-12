import { configureStore  } from '@reduxjs/toolkit' ;
import userSlice from '../Slices/userSlice';

export const mainstore = configureStore({
     reducer : {
        users : userSlice
     }
})