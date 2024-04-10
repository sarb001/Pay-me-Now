import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

   const isAuth = false;

  return (
    <>
     <div style = {{display : 'grid' ,gridTemplateColumns:'1.2fr 1.8fr' , padding:'1%' , backgroundColor:'lightsalmon' , justifyContent:'space-between' }}>
         <div> 
          <Link to = "/"> Digi-Pay  </Link>
         </div>
          {isAuth ? 
            <>
            <div style = {{display:'flex' ,flexDirection:'row',justifyContent:'space-evenly'}}>
                <button  style = {{padding:'1% 4%'}}> Logout  </button>
            </div>
            </>
          : <>      
              <div style = {{display:'flex' ,flexDirection:'row',justifyContent:'space-evenly'}}>
              <button  style = {{padding:'1% 4%'}}> 
                <Link to = "/signup"> SignUp </Link>
              </button>
              <button  style = {{padding:'1% 4%'}}> 
                  <Link to = "/login"> Login </Link>
              </button>
              </div>
              </>
          }
     </div>
    </>
  )
}

export default Navbar