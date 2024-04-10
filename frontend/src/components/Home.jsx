import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    
      <div style = {{display:'grid' , margin:'5% 25%' ,gridTemplateRows :'1fr 1fr 1fr' }}>
          
           <div style = {{display:'grid', gridTemplateColumns:'1fr 1fr' ,backgroundColor:'lightgray' , padding:'3%'}}>  
             <span style = {{width:'90%' ,height:'100%'}}>
               <img style = {{width:'100%', height:'100%'}} src  = "/public/main--user-img.jpg"   alt = "user-image" />
             </span>
             <span style = {{fontSize:'28px'}}> Pay or  Request Money  anytime ,anywhere </span>
           </div>

           <div style = {{marginTop:'5%' ,display:'grid', gridTemplateRows : '1fr 1fr' ,backgroundColor:'lightslategray' }}>
             <div style = {{fontSize:'28px',padding:'3%'}}> Register or Login ,add Money to your account and start sending to your family </div>
             <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between' ,margin:'5%'}}>
              <button style={{width:'50%'}}>
                 <Link to = "/signup"> Register </Link>
              </button>
              <button style={{width:'50%'}}>
                  <Link to = "/login"> Login </Link>
              </button>
             </div>
           </div>

           <div style = {{marginTop:'3%' ,padding:'7%',display:'grid', gridTemplateColumns : '1fr 1fr' ,backgroundColor: 'lightcoral' }}>
             <span> Qr Code  </span>
             <span style = {{fontSize:'26px'}}> A personal QR Code for your profile to accept payments. </span>
           </div>
      </div>
    
  )
}

export default Home