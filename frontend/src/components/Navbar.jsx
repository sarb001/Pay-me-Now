import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {

   const isAuth = false;

  return (
    <>
     <div className='grid  grid-cols-2 px-4 py-4 justify-between items-center w-full bg-black text-white md:px-12'>

         <div className='text-2xl px-4 font-bold'> 
          <Link to = "/"> Digi-Pay  </Link>
         </div>

        <div>

          {isAuth ? 
            <>
            <div style = {{display:'flex' ,flexDirection:'row',justifyContent:'space-evenly'}}>
                <button  style = {{padding:'1% 4%'}}> <LuClipboardCopy />  Logout  </button>
            </div>
            </>
          : <>      
              <div className='flex items-end justify-end '>
              <button  style = {{padding:'1%'}}> 
                 <Link to = "/dashboard">   <MdDashboard className='text-2xl' /> </Link>
              </button>
              </div>
              </>
          }

        </div>

     </div>
    </>
  )
}

export default Navbar