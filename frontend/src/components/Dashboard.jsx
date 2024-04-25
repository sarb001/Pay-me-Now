import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import UserOperations from './UserOperations';
import {  useSelector , useDispatch } from 'react-redux' ;
import { logout } from '../Slices/userSlice';
import {  useNavigate  } from 'react-router-dom' ;

const Dashboard = () => {

      const dispatch = useDispatch();
      const { userData   ,usertoken }  =  useSelector(state => state?.users);
      console.log('users ===',userData);

      const navigate = useNavigate();

     const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/');
     }

  return (
    <div style = {{display:'flex', flexDirection:'column',margin:'2% 12%'}}>
   
        <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between'}}>
            <div style = {{fontSize:'25px'}}> Dashboard Section </div>
            <div> 
              <button className='bg-black px-6 py-2 text-white' onClick={handleLogout}>
               <Link to = "/logout"> Logout </Link>
              </button>
            </div>
        </div>

        <div>
           <h3> Username = {userData?.username} </h3>
        </div>

         <div style = {{fontSize:'26px' , backgroundColor:'lightgray',marginTop:'3%' ,padding:'2%'}}>
                <div> <span> INR </span> </div>

                <div>  <span> Current Balance </span> </div>

              <div>  
                  Rs.{ userData?.accountBalance  ? userData?.accountBalance : 0 }
              </div>  
              </div> 

        <div>
            <UserOperations />
        </div>
       
    </div>
  )
}

export default Dashboard