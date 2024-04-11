import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' ;
import axios from 'axios';

const initialState = {
    loading : false,
    error : false
}

export const  RegisterUser = createAsyncThunk('/user/register' , async(userData , { rejectWithValue }) => {
     try {
         console.log('register userData =',userData);
         const  response = await axios.post('/user/register' ,userData);
         console.log('res =',response);
         return response.data;
     } catch (error) {  
        console.log(' registration error =',error);
     }
});

export const  LoginUser = createAsyncThunk('/user/login' , async(userData , { rejectWithValue }) => {
    try {
        console.log('login userData =',userData);
        const  response = await axios.post('/user/login' ,userData);
        return response.data;
    } catch (error) {  
       console.log(' login error =',error);
    }
});


export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers : (builder) =>  {
        builder.addCase()
    }
})