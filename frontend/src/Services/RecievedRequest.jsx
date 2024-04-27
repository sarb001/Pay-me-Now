import React from 'react'
import { useSelector } from 'react-redux' ; 

import { Button, Modal } from "flowbite-react";

const RecievedRequest = () => {


  const { usertoken , userData } = useSelector(state => state?.users);
  console.log('userData =',userData);
  
  return (
    <>
     
     {userData?.recievedRequest?.map((item) => 
          <div key = {item?._id} className='grid m-4'>

              <div className='bg-slate-400  p-3 m-1 font-bold w-1/3'>
                <div> {item?.username} </div>
                <div> {item?.createdAt} </div>
                <div>
                <div> {item?.amount} </div>
                </div>
                <div className='grid grid-cols-2 justify-between m-2'> 
                  <Button color='green' className='w-1/2'> Pay </Button>
                  <Button  className='w-1/2'> Reject </Button>
                </div>
              </div>

          </div>
     )}
    </>
  )
}

export default RecievedRequest