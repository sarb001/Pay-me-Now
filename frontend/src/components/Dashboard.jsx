import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserOperations from './UserOperations';
import {  useSelector } from 'react-redux' ;

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


  return (
    <div style = {{display:'flex', flexDirection:'column',margin:'2% 12%'}}>
   
        <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between'}}>
            <div style = {{fontSize:'25px'}}> Dashboard Section </div>
            <div> 
              <Link to = "/logout"> Logout </Link>
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