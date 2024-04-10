import axios from 'axios';
import React, { useState } from 'react'
import {  Link, useNavigate } from 'react-router-dom' ;

const Login = () => {

  const [username,setusername]   = useState('');
  const [password,setpassword]   = useState('');

  const navigate = useNavigate();

   const Loginhandler = async(e) => {
     e.preventDefault();
     const login = await axios.post('/api/v1/login',{
      username, password
     });

     const token  = login.data.token;
     localStorage.setItem('token',token);

     alert('User Logged in ');
     setusername(' ');
     setpassword(' ');
     navigate('/dashboard');
   }

  return (
    <>
    <div style = {{padding:'2'}}>
        <h2> Login Now </h2>

       <form onSubmit={Loginhandler}>

            <div style = {{padding:'2%'}}>
            <label> Username </label>
            <input type = "text"  placeholder='Enter User Name..'  
            value = {username}  onChange={(e) => setusername(e.target.value)}  />
            </div>

            <div style = {{padding:'2%'}}>
            <label> Password </label>
            <input type = "text"  placeholder='Enter Password...'  
            value = {password}  onChange={(e) => setpassword(e.target.value)}  />
            </div>
      
            <div style = {{margin:'3%'}}>
            <button  style = {{padding:'1% 2%'}} type = "submit"> Login Now </button>
            <div style = {{paddingTop:'3%'}}>
              <button style = {{padding:'1% 2%'}}>
                <Link  to = "/signup" > Don't have an Account? Create Now </Link>
              </button>
            </div>
            </div>
       </form>
       
      </div>
    </>
  )
}

export default Login