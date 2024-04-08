import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SendMoney = () => {

   const handlemoney = () => {
      
   }

  return (
      <>
       <div style = {{margin:'%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center' , backgroundColor:'lightgrey' , padding:'3% 0%'}}>

        <span style = {{margin :'3%'}}>
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