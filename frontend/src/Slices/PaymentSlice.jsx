import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' ;

const Payment = createAsyncThunk('' , async(userData , { rejectWithValue }) => {
    try {
        
    } catch (error) {
        console.log('error =',error);
    }
})

const initialState = {
    
}


const PaymentSlice = createSlice({
     name: 'payment',
     initialState,
     reducer : {

     },
     extraReducers : (builder) => {

     }
})
