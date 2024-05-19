import React from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { LuClipboardCopy } from "react-icons/lu";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {

   const isAuth = false;

  return (
    <>
     <div style = {{display : 'grid' ,gridTemplateColumns:'1.2fr 1.8fr' , padding:'1%' , backgroundColor:'lightsalmon' , justifyContent:'space-between' }}>

         <div className='text-2xl px-4 font-bold'> 
          <Link to = "/"> Digi-Pay  </Link>
         </div>


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
    </>
  )
}

export default Navbar