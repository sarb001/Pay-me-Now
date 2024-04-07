import React, { useState } from 'react'

const SendMoney = () => {

  const [users,setusers] = useState('');

  return (
      <>
       <div style = {{margin:'4%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center'}}>
        <div>
          <input style = {{padding:'2% 2%'}} type = "text"  placeholder= "Enter User Name"  value ={users} 
          onChange={(e) => setusers(e.target.value)} />
         </div>
        <div>
          <h2> Showing All Users </h2>
        </div>

       <div style = {{ display:'flex' , flexDirection:'column' ,backgroundColor:'lightsalmon',margin:'3%',padding:'4%'}}>
          <span style = {{paddingTop:'8%'}}> Ankit singh <button> Send Money </button> </span>
          <span style = {{paddingTop:'8%'}}> Ankit singh <button> Send Money </button> </span>
          <span style = {{paddingTop:'8%'}}> Ankit singh <button> Send Money </button> </span>
       </div>

       </div>
      </>
  )
}

export default SendMoney