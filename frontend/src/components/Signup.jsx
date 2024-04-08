import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios' ;

const Signup = () => {

  const [firstname,setfirstname] = useState('');
  const [lastname,setlastname]   = useState('');
  const [username,setusername]   = useState('');
  const [password,setpassword]   = useState('');

  const  navigate = useNavigate();

   const signuphandler = async(e) => {
    console.log('inside signuphandler');
     e.preventDefault();

     try {
        const signup = await axios.post('/api/v1/signup' ,{
        firstname,
        lastname,
        username,
        password
      })
      alert('Account created ');
      setfirstname(''); setlastname(''); setpassword(''); setusername('');
      navigate('/login');
     } catch (error) {
        console.log('signuperror =',error);
     }
    }

  return (
    <>
     <div className='signup' style ={{padding:'3%'}}>

          <h2> Create An Account  </h2>

        <form onSubmit={signuphandler}>
          
              <div style = {{padding:'2%'}}>
                <label> First Name </label>
                <input type = "text"  placeholder='Enter First Name..'  
                value = {firstname}  onChange={(e) => setfirstname(e.target.value)}  />
              </div>

                <div style = {{padding:'2%'}}>
                <label> Last Name </label>
                <input type = "text"  placeholder='Enter Last Name..'  
                value = {lastname}  onChange={(e) => setlastname(e.target.value)}  />
                </div>
              
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
          
            <div style = {{margin:'3%' ,padding:'3%'}}>
              <button type = "submit"> Create an Account </button>
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