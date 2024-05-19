import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' ;

const Home = () => {
  
  const { userData  } = useSelector(state => state?.users);
  console.log('userData home',userData);

  return (
    
      <div className='grid grid-rows-2 gap-6 my-4 mx-2'>
          
           <div>  

              <div>
                <img  src  = "/main--user-img.jpg"   alt = "user-image" />
              </div>

              <div> Pay or  Request Money  anytime ,anywhere </div>

           </div>

           <div>

              <div> Register or Login ,add Money to your account and start sending to your family 
              </div>

                {userData ? (
                <>
                  <button className='w-1/2 bg-slate-700 text-white p-4'>
                    <Link to = "/dashboard"> Dashboard </Link>
                  </button>
                </>) :
                
                (<> 
                  <div style = {{display:'grid',gridTemplateColumns:'1fr 1fr' ,justifyContent:'space-between' ,margin:'5%'}}>
                    <button className='w-1/2 bg-slate-700 text-white p-4'>
                      <Link to = "/signup"> Register </Link>
                    </button>
                    <button className='w-1/2 bg-slate-700 text-white p-4'>
                        <Link to = "/login"> Login </Link>
                    </button>
                  </div>
                </>)}

           </div>

      </div>
    
  )
}

export default Home