import axios from 'axios';
import React, { useState } from 'react'
import { Link, useSearchParams ,useLocation, useNavigate } from 'react-router-dom';

import { Button, Modal } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { TransferMoney } from '../Slices/userSlice';


const SendMoney = () => {

  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  console.log('id is =',id);
  const name = searchparams.get("name");
  console.log('name is =',name);

  const [amount,setamount] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

   const { usertoken } = useSelector(state => state?.users);
   console.log('user token =',usertoken);

   const handlemoney = async(e) => {
       e.preventDefault();
        dispatch(TransferMoney({usertoken,amount,id}));
       navigate('/dashboard');
   }

  return (
      <>
       <div style = {{margin:'%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center' , backgroundColor:'lightgrey' , padding:'3% 0%'}}>

          <span style = {{margin :'3%'}}>
             <h2> Payment to = {name}  </h2>
          <label> Enter Amount (in Rs.) </label>
          <input style  = {{padding:'1%'}} type = "number" 
           value = {amount}
           onChange={(e) => setamount(e.target.value)}
          placeholder='Enter Amount '  />
          </span>

          <div>
          <Button onClick={handlemoney} style = {{padding:'1%'}}> Send Money </Button>
          </div>

       </div>
      </>
  )
}

export default SendMoney