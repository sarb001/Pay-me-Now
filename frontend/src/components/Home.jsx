import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux' ;

const Home = () => {
  
  const { userData  } = useSelector(state => state?.users);
  console.log('userData home',userData);

  return (
    
      <div className='grid grid-rows-[0.6fr_0.4fr] gap-6 my-4 mx-2   md:w-[600px] md:m-auto md:pt-5 '>
          
           <div className='p-4 bg-zinc-200 rounded-3xl tab:grid tab:grid-cols-2 tab:gap-5 tab:p-8 '>  

              <div>
                <img className='w-full h-full object-cover rounded-3xl ' src  = "/main--user-img.jpg"   alt = "user-image" />
              </div>

              <div className='text-3xl font-bold grid justify-center items-center mt-4 tab:text-4xl  md:text-3xl '> 
                <div> Pay or  Request Money </div>
                <div className = 'text-xl'> 
                   anytime ,anywhere 
                </div>
              </div>

           </div>

           <div className='p-4 bg-zinc-200 rounded-3xl tab:p-8 '>

              <div className='text-2xl font-bold '> Register or Login ,add Money to your account and start sending to your family 
              </div>

                {userData ? (
                <>
                  <button className='w-1/2 bg-slate-700 text-white p-4'>
                    <Link to = "/dashboard"> Dashboard </Link>
                  </button>
                </>) :
                
                (<> 
                  <div className='p-4 grid grid-cols-2 gap-5'>
                    <button className=' tab:w-1/2 px-4 py-2 bg-black text-white p-4 tab:px-1 tab:py-0 '>
                      <Link to = "/signup"> Register </Link>
                    </button>
                    <button className=' tab:w-1/2 px-4 py-2  bg-black text-white p-4 tab:py-1 
                    
                    '>
                        <Link to = "/login"> Login </Link>
                    </button>
                  </div>
                </>)}

           </div>

      </div>
    
  )
}

export default Home