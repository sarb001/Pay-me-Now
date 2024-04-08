import axios from 'axios';
import React, { useState } from 'react'
import { Link, useSearchParams ,useLocation, useNavigate } from 'react-router-dom';

const SendMoney = () => {

  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  console.log('id is =',id);
  const name = searchparams.get("name");
  console.log('name is =',name);

  const [amount,setamount] = useState(0);
  const navigate = useNavigate();

   const  token = localStorage.getItem('token');

   const handlemoney = async(e) => {
       e.preventDefault();
       try {
          const res = await axios.post('/api/v1/account/transfer',{
              amount , 
              to : id
          },{
            headers : {
              'Authorization' : `Bearer ${token}`
            }
          })
          console.log('res =',res);
          navigate('/dashboard');
       } catch (error) {
        console.log('payment transfer errror =',error);
       }
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
          <button onClick={handlemoney} style = {{padding:'1%'}}> Send Money </button>
          </div>

       </div>
      </>
  )
}

export default SendMoney