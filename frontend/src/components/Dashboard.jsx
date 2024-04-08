import React from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

const Dashboard = () => {

  const balance = 10;

  return (
    <>
     <div style = {{display:'flex',textAlign:'center'}}>
        <span style = {{fontSize:'25px'}}> Dashboard Section </span>

        <div style = {{fontSize:'26px' , backgroundColor:'lightgray',marginTop:'3%' ,padding:'2%'}}>
            <div> <span> INR </span> </div>

            <div>  <span> Current Balance </span> </div>

            <div>  <span> Rs.  {balance}  </span></div>

        </div>
     </div>

     <div style = {{display:'flex' ,alignItems:'center'}}>
       <h2> Services  </h2>

        <div style = {{padding:'2%' , backgroundColor:'lightsalmon' , margin:'2%'}}>   
        <span> <FaCircleArrowRight /> </span>
          <Link to = "/users" > Send Money  </Link> 
        </div>

        <div style = {{padding:'2%' , backgroundColor:'lightsalmon' , margin:'2%'}}> 
        <span> <MdPayments /> </span>
          <Link to = "/" >  All Transactions  </Link>  
        </div>

        <div style = {{padding:'2%' , backgroundColor:'lightsalmon' , margin:'2%'}}> 
          <span> <FaUserCircle />  </span>
          <Link to = "/profile" >  Profile  </Link>  
        </div>
       
     </div>
    </>
  )
}

export default Dashboard