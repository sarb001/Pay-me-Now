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

    allTransactionloading: false,
    allTransactionerror : false,


    addmoneyloading: false,
    addmoneyerror : false,

    requestmoneyloading :false,
    requestmoneyerror : false,

    balanceloading : false,

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


export const TransferMoney = createAsyncThunk('/api/v1/account/transfer' , async(userData , { rejectWithValue }) => {
    try {
         console.log('transfer money userData =',userData);

         const { amount , id ,usertoken } = userData;
        const res = await axios.post('/api/v1/account/transfer',{
            amount , 
            to : id
        },{
          headers : { 'Authorization' : `Bearer ${usertoken}` }
        });

        console.log('res =',res.data);
        return res.data.user;
    } catch (error) {
            console.log('handle money error ',error);
    }
})

export const AddMoney  = createAsyncThunk('/api/v1/account/addmoney' , async(userData , { rejectWithValue }) => {
    try {

        console.log('userdata addmoney =',userData);
        const { usertoken ,modalamount } = userData;
        const res = await axios.post('/api/v1/account/addmoney',{
            modalamount
        },{
            headers:{
                'Authorization' : `Bearer ${usertoken}`
            }
        });
        console.log('res for addmoney=',res.data.user);
        return res?.data?.user;

    } catch (error) {
            console.log('addmoney error=',error);
    }
})


export const RequestMoney = createAsyncThunk('/api/v1/account/requestmoney' ,async(userData, { rejectWithValue }) => {
    try {
        const { usertoken ,modalamount, id } = userData;
        const res = await axios.post('/api/v1/account/requestmoney',{
            modalamount , id
        },{
            headers:{
                'Authorization' : `Bearer ${usertoken}`
            }
        });
        console.log('res from requestmoney =',res);
        return res?.data?.user;

    } catch (error) {   
            console.log(' request moeny error =',error);
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


        .addCase(TransferMoney.pending , (state,action) => {
             state.balanceloading = false;
            })
        .addCase(TransferMoney.fulfilled , (state,action) => {
                state.balanceloading = true;
                state.validateuser = true
                console.log('action 11 ',action.payload);
                // correct it ( making transactions )
                state.userData  = action.payload;
                console.log('action 22 ',action.payload);
        })
        .addCase(TransferMoney.rejected , (state,action) => {
                  state.balanceloading = false;
                  state.error = action.payload;
        })

        .addCase(AddMoney.pending ,  (state,action) => {
                state.addmoneyloading = true;
        })
        .addCase(AddMoney.fulfilled , (state,action) => {
               state.validateuser = true;
               state.addmoneyloading = false;
               console.log('payload - addmoney 1 =',action.payload);
               state.userData = action.payload;
               console.log('payload - addmoney 2  =',action.payload);
        })
        .addCase(AddMoney.rejected ,  (state,action) => {
                state.addmoneyloading = false;
                state.validateuser = false;
                state.addmoneyerror = action.payload
        })


        .addCase(RequestMoney.pending ,  (state,action) => {
                 state.requestmoneyloading = true;
         })
        .addCase(RequestMoney.fulfilled , (state,action) => {
                state.validateuser = true;
                state.requestmoneyloading = false;
                console.log('payload - request money 1 =',action.payload);
                state.userData = action.payload;
                console.log('payload - request money 2  =',action.payload);
        })
        .addCase(RequestMoney.rejected ,  (state,action) => {
                state.requestmoneyloading = false;
                state.validateuser = false;
                state.requestmoneyerror = action.payload
        })

}
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;