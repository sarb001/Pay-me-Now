import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' ;
import axios from 'axios';

const initialState = {
    loading : false,
    error : false
}

export const  RegisterUser = createAsyncThunk('/api/v1/register' , async(userData , { rejectWithValue }) => {
     try {
         console.log('register userData =',userData);
         const  response = await axios.post('/api/v1/register' ,userData);
         console.log('res =',response);
         return response.data;
     } catch (error) {  
        console.log(' registration error =',error);
     }
});

export const  LoginUser = createAsyncThunk('/api/v1/login' , async(userData , { rejectWithValue }) => {
    try {
        console.log('login userData =',userData);
        const  response = await axios.post('/api/v1/login' ,userData);
        localStorage.setItem('token',response.data.token);
        console.log(' login response =',response);
        return response.data;
    } catch (error) {  
        return  console.log(' login error =',error);
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