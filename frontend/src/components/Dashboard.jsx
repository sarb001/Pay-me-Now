import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserOperations from './UserOperations';
import {  useSelector , useDispatch } from 'react-redux' ;
import { logout } from '../Slices/userSlice';
import {  useNavigate  } from 'react-router-dom' ;

const Dashboard = () => {

     const token = localStorage.getItem('token');
     const [balance,setbalance] = useState(0);

      useEffect(() => {
         const fetchBalance = async() => {
            try { 
               const checkbalance = await axios.get('/api/v1/account/balance' , {
                  headers : {
                    'Authorization': `Bearer ${token}`
                  }
                });
                setbalance(checkbalance.data.balance.toFixed());
            } catch (error) {
                console.log('fetch balance error =',error);
            }
         }
         fetchBalance();
      },[])

      const { userData }  =  useSelector(state => state?.users);
      console.log('users ===',userData);

      const dispatch = useDispatch();
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
              <button onClick={handleLogout}>
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

                <div>  <span> Rs.  {balance}  </span></div>

        </div>

        <div>
            <UserOperations />
        </div>

    </div>
  )
}

export default Dashboard