
import React, { useState } from 'react'
import {  Link, useNavigate   } from 'react-router-dom' ;
import { useDispatch } from 'react-redux';
import { LoginUser } from '../Slices/userSlice';

const Login = () => {

  const [username,setusername]   = useState('');
  const [password,setpassword]   = useState('');
  const [loading,setloading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

   const Loginhandler = async(e) => {
     e.preventDefault();
     setloading(true);
     await dispatch(LoginUser({username,password}));
     setloading(false);
     setusername(' ');
     setpassword(' ');
      navigate('/dashboard');
   }

   const addCredentials = async() => {
      setusername('amandeep@22');
      setpassword('amandeep@22');
      await dispatch(LoginUser({username,password}));
   }

  return (
    <>
       <div className = 'flex justify-center items-center' >

       <form onSubmit={Loginhandler}>
       
         <div className='text-2xl font-bold flex justify-center'> Login  </div>

          <div className='py-4 px-8 bg-zinc-400 flex flex-col gap-4 '>

                  <div>
                    <label className='flex flex-col'> 
                      <div className='font-semibold'> Username </div>
                      <div>
                        <input className='p-0 w-full' type = "text"  placeholder='Enter User Name..'  
                        value = {username}  onChange={(e) => setusername(e.target.value)}  />
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
                      <button className='bg-black  w-full text-white px-5 py-2' type = "submit">
                        {loading ? "Logging In.." : " Login Now " } 
                      </button>
                    </div>

                </div>
          </div>
        </form>

                  <div>
                    <button className='bg-black w-full text-white px-5 py-2'  
                    onClick={addCredentials} > Guest Credentials </button>
                  </div>

                <div>
                    <Link className='font-semibold text-amber-50 ' to = "/signup" > Don't have an Account? Create Now </Link>
                </div>

          </div>

       
      
    </>
  )
}

export default Login