import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
     <div style = {{display : 'flex' , flexDirection:'row' , padding:'1%' , backgroundColor:'lightsalmon' , justifyContent:'space-between' }}>
         <div> 
          <Link to = "/dashboard"> Payments App  </Link>
         </div>
         <div> User Profile </div>
     </div>
    </>
  )
}

export default Navbar