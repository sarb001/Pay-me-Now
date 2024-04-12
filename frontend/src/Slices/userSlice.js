import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' ;
import axios from 'axios';
import { toast } from 'react-toastify' ;

const initialState = {
    loading : false,
    error : false,
    userData : null,
}

export const  RegisterUser = createAsyncThunk('/api/v1/signup' , async(userData , { rejectWithValue }) => {
     try {
         console.log('register userData =',userData);
         const  response = await axios.post('/api/v1/signup' ,userData);
         console.log('res =',response);
         toast.success(' User Registration Completed ');
         return true;
     } catch (error) {  
         console.log(' registration error =',error);
         toast.error("Something went wrong");
         return rejectWithValue(error.response.data.message || "Something went wrong")
     }
});

export const  LoginUser = createAsyncThunk('/api/v1/login' , async(userData , { rejectWithValue }) => {
    try {
        console.log('login userData =',userData);
        const  response = await axios.post('/api/v1/login' ,userData);
        localStorage.setItem('token',response.data.token);
        console.log(' login response =',response);
        toast.success(' Logged In Successfully ');
        return response.data;
    } catch (error) {  
        console.log(' login error =',error);
        toast.error("Something went wrong");
        return rejectWithValue(error.response.data.message || "Something went wrong")
    }
});


export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {

    },
    extraReducers : (builder) =>  {
        builder.addCase(RegisterUser.pending ,  (state,action) => {
                state.loading = true;
        })
        builder.addCase(RegisterUser.fulfilled , (state,action) => {
                state.loading = false;
                state.userData = action.payload;        // true when  creating 
        })
        builder.addCase(RegisterUser.rejected , (state,action) => {
                state.loading = false;
                state.error   =  action.payload;
        })


        builder.addCase(LoginUser.pending ,  (state,action) => {
                state.loading = true;
        })
        builder.addCase(LoginUser.fulfilled , (state,action) => {
                const { user ,token } = action.payload
                state.loading = false;
                state.userData = user;        //  get token  
        })
        builder.addCase(LoginUser.rejected , (state,action) => {
                state.loading = false;
                state.error   =  action.payload;
        })
    }
})