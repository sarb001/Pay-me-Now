import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import UserOperations from './UserOperations';

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

  return (
    <div style = {{display:'flex', flexDirection:'column',margin:'2% 12%'}}>
   
        <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between'}}>
            <div style = {{fontSize:'25px'}}> Dashboard Section </div>
            <div> 
              <Link to = "/logout"> Logout </Link>
            </div>
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