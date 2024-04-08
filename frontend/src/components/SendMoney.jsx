import React, { useState } from 'react'
import { Link, useSearchParams ,useLocation } from 'react-router-dom';

const SendMoney = () => {

  const [searchparams] = useSearchParams();
  const id = searchparams.get("id");
  console.log('id is =',id);
  const name = searchparams.get("name");
  console.log('name is =',name);


   const handlemoney = () => {
       
   }

  return (
      <>
       <div style = {{margin:'%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center' , backgroundColor:'lightgrey' , padding:'3% 0%'}}>

          <span style = {{margin :'3%'}}>
             <h2> Payment to = {name}  </h2>
          <label> Enter Amount (in Rs.) </label>
          <input style  = {{padding:'1%'}} type = "number"  placeholder='Enter Amount '  />
          </span>

        <div>
         <button onClick={handlemoney} style = {{padding:'1%'}}> Send Money </button>
        </div>

       </div>
      </>
  )
}

export default SendMoney