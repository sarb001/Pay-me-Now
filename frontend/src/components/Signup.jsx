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

  return (
    <>
     <div className='signup' style = {{padding:'2%' , display:'flex',flexDirection:'column',alignItems:'center'}}>

        <form onSubmit={signuphandler} className ='bg-lime-300 p-4'>
          
          <h2> Create An Account  </h2>
                <div className='p-1'>
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
          
            <div>

                <button className=' bg-black text-white p-2 m-2'  type = "submit"> 
                  Create an Account 
                </button>

              <div className=' bg-black text-white p-2'>
                  <Link  to = "/login" > Login Now </Link> 
              </div>
            </div>
          
        </form>

     </div>
    </>
  )
}

export default Signup