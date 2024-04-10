import React from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";

const UserOperations = () => {
  return (
    <div>
         <div style = {{padding:'2%' , display:'grid', gridTemplateColumns:'1fr 1fr 1fr' , backgroundColor:'lightsalmon' , margin:'2%'}}>   
           
            <div>
                <button style = {{padding:'1%'}}>
                    <span> <FaCircleArrowRight /> </span>
                    <Link to = "/users" > Send Money  </Link> 
                </button>
            </div>

            <div> 
                <button  style = {{padding:'1%'}}> 
                <span> <MdPayments /> </span>
                <Link to = "/" >  All Transactions  </Link>  
                </button>
            </div>

            <div> 
                <button  style = {{padding:'1%'}}> 
                <span> <MdPayments /> </span>
                <Link to = "/" >  Add Money  </Link>  
                </button>
            </div>
        </div>
       
    </div>
  )
}

export default UserOperations