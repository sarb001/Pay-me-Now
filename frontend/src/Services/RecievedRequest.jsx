import React from 'react'
import { useSelector } from 'react-redux' ; 

import { Button, Modal } from "flowbite-react";

const RecievedRequest = () => {


  const { usertoken , userData } = useSelector(state => state?.users);
  console.log('userData =',userData);
  
  const rejectnow = () => {}

  const paynow = (id,amount) => {
     console.log('mainpayerid=',id);
     console.log('mainpayer amount=',amount);
    
  }

  return (
    <>
     
     {userData?.recievedRequest?.map((item) => 
          <div className='grid m-4'>

              <div className='bg-slate-400  p-3 m-1 font-bold w-1/3'>
                <div> {item?.username} </div>
                <div> {item?.createdAt} </div>
                <div>
                <div> {item?.amount} </div>
                </div>
                <div className='grid grid-cols-2 justify-between m-2'> 
                  <Button color='green' className='w-1/2'  onClick={() => paynow
                  (item?._id,item?.amount)}> Pay </Button>
                  <Button  className='w-1/2'onClick={rejectnow}> Reject </Button>
                </div>
              </div>

          </div>
     )}
    </>
  )
}

export default RecievedRequest