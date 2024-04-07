import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

  const [firstname,setfirstname] = useState('');
  const [lastname,setlastname]   = useState('');
  const [username,setusername]   = useState('');
  const [password,setpassword]   = useState('');

   const signuphandler = (e) => {
     e.preventDefault();
   }

  return (
    <>
     <div className='signup'>

          <h2> Create An Account  </h2>

        <form onSubmit={signuphandler}>
          
           <div>
            <label> First Name </label>
            <input type = "text"  placeholder='Enter First Name..'  
            value = {firstname}  onChange={(e) => setfirstname(e.target.value)}  />
           </div>

            <div>
            <label> Last Name </label>
            <input type = "text"  placeholder='Enter Last Name..'  
            value = {lastname}  onChange={(e) => setlastname(e.target.value)}  />
            </div>
          
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
          
            <button type = "submit"> Create an Account </button>
            <Link  to = "/login" > Login Now </Link>
          
        </form>

     </div>
    </>
  )
}

export default Signup