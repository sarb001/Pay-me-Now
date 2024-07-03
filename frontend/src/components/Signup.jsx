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
        <div className = 'flex justify-center items-center' >
          <form onSubmit={signuphandler}>

            <div className='text-2xl font-bold flex justify-center'> Create an Account  </div>

            <div className='py-4 px-16 bg-zinc-400 flex flex-col gap-4 '>

                  <div>
                    <label className='flex flex-col'> 
                      <div className='font-semibold'>  Full Name  </div>
                      <div>
                        <input  className='p-0 w-full' type = "text"  placeholder='Enter Full Name..'  
                        value = {fullname}  onChange={(e) => setfullname(e.target.value)}  />
                      </div>
                  </label>
                  </div>

                  <div>
                    <label className='flex flex-col' >
                      <div className='font-semibold'> Username </div>
                      <div>
                      <input className='p-0 w-full'  type = "text"  placeholder='Enter Your UserName..'  
                        value = {username}  onChange={(e) => setusername(e.target.value)}  />
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className='flex flex-col' >
                      <div className='font-semibold'> Email </div>
                      <div>
                      <input  className='p-0 w-full' type = "email"  placeholder='Enter Email..'  
                      value = {email}  onChange={(e) => setemail(e.target.value)}  />
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className='flex flex-col' >
                      <div className='font-semibold'> Password </div>
                      <div>
                      <input className='p-0 w-full' type = "text"  placeholder='Enter Password...'  
                      value = {password}  onChange={(e) => setpassword(e.target.value)}  />
                      </div>
                    </label>
                  </div>


                  <div className='flex flex-col justify-center gap-4'>

                    <div>
                        <button className='bg-black  w-full text-white px-5 py-2' type = "submit">  Create an Account </button>
                    </div>

                  </div>

                  <div className='flex justify-center'>
                      <Link className='font-semibold text-amber-50 ' to = "/login" > Login Now  </Link>
                  </div>

            </div>

          </form>

        </div>
    </>
  )
}

export default Signup