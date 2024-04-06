import React from 'react'

const Navbar = () => {
  return (
    <>
     <div style = {{display : 'flex' , flexDirection:'row' , padding:'1%' , backgroundColor:'lightsalmon' , justifyContent:'space-between' }}>
         <div> Payments App </div>
         <div> User Profile </div>
     </div>
    </>
  )
}

export default Navbar