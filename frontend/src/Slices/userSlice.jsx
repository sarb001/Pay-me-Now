import { createAsyncThunk, createSlice } from '@reduxjs/toolkit' ;
import axios from 'axios';
import { toast } from 'react-toastify' ;

const initialState = {
    
    usertoken : localStorage.getItem('token') || null,
    loading : false,
    error : false,
    userData : null,        // for login

    validateuser : false,
    validateUserLoading : false,

    balanceloading : false,

    balance : 0,


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

export const ValidateUser = createAsyncThunk('/api/v1/profile' , async(userData , { rejectWithValue }) => {
    try {
            console.log('userdata =',userData);
        const response = await axios.get('/api/v1/profile' , {
             headers : { 'Authorization' : `Bearer ${userData.usertoken}` }
        });
        console.log('profile valid',response.data.user);
        return response.data.user;
    } catch (error) { 
        console.log('error =',error);
    }
})


export const ShowBalance = createAsyncThunk('/api/v1/account/balance' , async(userData , { rejectWithValue }) => {
    try {
        console.log('insde slice',userData);
        const balance = await axios.get('/api/v1/account/balance' ,{
            headers : { 'Authorization' : `Bearer ${userData.usertoken}` }
        });
        console.log('balance -==',balance);
        return balance;

    } catch (error) {
            console.log(' balance error= ',error);
    }
})


 const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logout(state,action){
            state.usertoken = null;
            state.userData = null;
        }
    },
    extraReducers : (builder) =>  {

        builder
        .addCase(RegisterUser.pending ,  (state,action) => {
                state.loading = true;
        })
        .addCase(RegisterUser.fulfilled , (state,action) => {
                state.loading = false;
                state.userData = action.payload;        // true when  creating 
        })
        .addCase(RegisterUser.rejected , (state,action) => {
                state.loading = false;
                state.error   =  action.payload;
        })

        .addCase(LoginUser.pending ,  (state,action) => {
            state.loading = true;
        })
        .addCase(LoginUser.fulfilled , (state,action) => {
            const { user ,token } = action.payload;
                console.log('user before =',user);
                console.log('tokken before =',token);
                state.userData = user;        //  get token , user 

                state.usertoken = token;
                state.loading = false;
                
        })
        .addCase(LoginUser.rejected , (state,action) => {
                state.loading = false;
                state.error   =  action.payload;
        })


        .addCase(ValidateUser.pending ,  (state,action) => {
                state.validateUserLoading = true;
        })
        .addCase(ValidateUser.fulfilled , (state,action) => {
            console.log('action validate =',action.payload);
                // state.usertoken
                state.userData = action.payload;         // full user profile
                state.validateuser = true
                state.validateUserLoading = false;
        })
        .addCase(ValidateUser.rejected , (state,action) => {
                state.validateUserLoading = false;
                state.validateuser = false;
                state.error  =  action.payload;
        })


        .addCase(ShowBalance.pending , (state,action) => {
             state.balanceloading = false;
            })
        .addCase(ShowBalance.fulfilled , (state,action) => {
                state.balanceloading = true;
                state.validateuser = true
                state.balance = action.payload;
        })
        .addCase(ShowBalance.rejected , (state,action) => {
                state.error = action.payload
        })

}
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;