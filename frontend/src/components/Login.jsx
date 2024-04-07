import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom' ;

const Login = () => {

  const [username,setusername]   = useState('');
  const [password,setpassword]   = useState('');

  const navigate = useNavigate();

   const Loginhandler = (e) => {
     e.preventDefault();
   }

  return (
    <>
        <h2> Login Now </h2>

       <form onSubmit={Loginhandler}>

        <div>
         <label> Username </label>
         <input type = "text"  placeholder='Enter User Name..'  
         value = {username}  onChange={(e) => setusername(e.target.value)}  />
         </div>

         <div>
         <label> Password </label>
         <input type = "text"  placeholder='Enter Password...'  
         value = {password}  onChange={(e) => setpassword(e.target.value)}  />
         </div>
      
        <button type = "submit"> Login Now </button>
          <Link  to = "/signup" > Don't have an Account? Create Now </Link>
       </form>
       
    </>
  )
}

export default Login