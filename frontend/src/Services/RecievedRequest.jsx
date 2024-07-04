import React from 'react'
import { useDispatch, useSelector } from 'react-redux' ; 
import { Button } from "flowbite-react";
import { AcceptMoney, RejectMoney } from '../Slices/userSlice';

const RecievedRequest = () => {

  const { usertoken , userData } = useSelector(state => state?.users);
  console.log('userData =',userData);
  console.log('usertoken recieved =',usertoken);
  
  const dispatch = useDispatch();

  const rejectnow = (id,amount,fullname) => {
    console.log('main id =',id);
    console.log('amount is',amount); 
    console.log('fullname is =',fullname); 
    dispatch(RejectMoney({ id, amount, fullname ,usertoken}));
  }

  const paynow = (id,amount,fullname) => {
     console.log('main id =',id);
     console.log('amount is',amount); 
     console.log('fullname is =',fullname); 
     dispatch(AcceptMoney({id,amount,fullname , usertoken}));
  }

  return (
    <>
     
     {userData?.recievedRequest?.length > 0  ? userData?.recievedRequest?.map((item) => 
          <div className='grid m-4'>

              <div className='bg-slate-400  p-3 m-1 font-bold w-1/3'>
                <div> {item?.username} </div>
                <div> {item?.createdAt} </div>
                <div>
                <div> {item?.amount} </div>
                </div>
                <div className='grid grid-cols-2 justify-between m-2'> 
                  <Button color='green' className='w-1/2'  onClick={() => paynow
                  (item?._id,item?.amount,item?.fullname)}> Pay </Button>

                  <Button  className='w-1/2'  onClick = {() => rejectnow
                  (item?._id,item?.amount,item?.fullname)}> Reject </Button>
                </div>
              </div>

          </div>
     ) : "No Requests Available"}
    </>
  )
}

export default RecievedRequest