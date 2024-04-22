import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' ;
import {  useDispatch } from 'react-redux' ;
import { RegisterUser } from '../Slices/userSlice';
import { toast } from 'react-toastify' ;

const Signup = () => {

  const [fullname,setfullname] = useState('');
  const [username,setusername]   = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword]   = useState('');

  const  navigate = useNavigate();
  const dispatch = useDispatch();

   const signuphandler = async(e) => {
       console.log('inside signuphandler');
       e.preventDefault();
       await dispatch(RegisterUser({fullname,username,email,password}));
       navigate('/login');
    }

    // Full name
    // username
    // email
    // password

  return (
    <>
     <div className='signup' style = {{padding:'2%' ,display:'flex',flexDirection:'column',alignItems:'center'}}>

        <form onSubmit={signuphandler}>
          
          <h2> Create An Account  </h2>
              <div style = {{padding:'2%'}}>
                <label> Full Name </label>
                <input type = "text"  placeholder='Enter Full Name..'  
                value = {fullname}  onChange={(e) => setfullname(e.target.value)}  />
              </div>

                <div style = {{padding:'2%'}}>
                <label> Username </label>
                <input type = "text"  placeholder='Enter Your UserName..'  
                value = {username}  onChange={(e) => setusername(e.target.value)}  />
                </div>
              
                <div style = {{padding:'2%'}}>
                <label> Email </label>
                <input type = "email"  placeholder='Enter Email..'  
                value = {email}  onChange={(e) => setemail(e.target.value)}  />
                </div>

                <div style = {{padding:'2%'}}>
                <label> Password </label>
                <input type = "text"  placeholder='Enter Password...'  
                value = {password}  onChange={(e) => setpassword(e.target.value)}  />
                </div>
          
            <div style = {{margin:'3%' ,padding:'3%'}}>
              <button  style = {{padding:'1% 2%'}}  type = "submit"> 
                Create an Account 
              </button>

              <div style = {{padding:'3%'}}>
                  <Link  to = "/login" > Login Now </Link> 
              </div>
            </div>
          
        </form>

     </div>
    </>
  )
}

export default Signup