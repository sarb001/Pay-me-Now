import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';

import { Button, Modal } from "flowbite-react";
import { AddMoney } from '../Slices/userSlice';


const UserOperations = () => {
    const [openModal, setOpenModal] = useState(false);
    const [modalamount,setmodalamount] = useState(0);

     const { userData   ,usertoken } = useSelector(state => state?.users);
     console.log('useroktne-',usertoken);
 
     const MoneyButtons = [
        { amount : 10 ,id : 1 },
        { amount : 100 ,id : 2 },
        { amount : 500 ,id : 3 },
        { amount : 1000 ,id : 4 },
     ]

     const dispatch = useDispatch();
     
     const showmamount = (e) => {
         e.preventDefault();
         const finalamount = e.target.textContent ;
         console.log('finalamount ==',Number(finalamount));
            if(modalamount == 0) 
             {
                 setmodalamount(finalamount);
                 console.log('modal amount =',modalamount);
             }
             else {
                 console.log('modalamount ==',Number(modalamount));
                 setmodalamount(Number(finalamount) + Number(modalamount));
             }
      }  


     const onchangeamount = (e) => {
        const amountchanged = e.target.value;
        console.log('event amount chg=',amountchanged);
        setmodalamount(amountchanged);
     }
     
     const Addmoney = () => {
        console.log('modalamount final =',modalamount);
        dispatch(AddMoney({ usertoken,modalamount}));
     }



  return (
    <>
         <div className='mt-5 bg-[#e9e7e7] grid grid-cols-2 gap-5 text-center p-4 '>   
           
                <div className='grid gap-4 justify-between'>

                    <div>
                        <button className='bg-blue-400 px-2 w-full  py-2  font-bold border-2 border-black'> 
                            <Link to = "/users" > Pay /Request Money  </Link> 
                        </button>
                    </div>

                    <div>
                            <button className='bg-blue-400 w-full py-2 px-2  font-bold border-2  border-black'>
                            <Link to = "/recievedrequests" > Received Requests  </Link>
                             </button>
                    </div> 
                
                </div>
            
                <div className='grid gap-4 justify-between'>

                        <div>
                            <button className=' font-bold bg-blue-400 py-2 px-2 border-2 border-black'> 
                            <Link to = "/sentrequests" >  Sent Requests   </Link>
                            </button>
                        </div>   

                        <div>
                            <Button onClick={() => setOpenModal(true)}>  Add Money  </Button>
                        </div>

                </div>

        </div>

                <div className='m-4 bg-[#e9e7e7]'> 
                        <button className='bg-blue-400 w-full p-2 px-2 font-bold border-2 border-black'>
                        <Link to = "/alltransaction" >  All Transactions  </Link>  
                        </button>
                </div>
           
        

            {/*  Add Money Modal  */}

            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                <div className="text-center">
                    <form class="space-y-4" >

                            <div>
                            <label for="amount" name = "amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Enter Amount     
                            </label>
                            <input className = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                                type = "number" placeholder='Enter Amount ' 
                                            style = {{padding:'2%'}}
                                            value = {modalamount}
                                            onChange={(e) => onchangeamount(e)}
                                            required
                                />

                            </div>

                        <div style = {{margin:'12% 2%'}}>

                            {MoneyButtons?.map((item) =>
                                
                                    <div className = 'grid grid-cols-2 m-2' key = {item.id}>
                                        
                                        <Button   color = "success"  type = "submit"
                                        onClick={(e) => showmamount(e)}> 
                                            {item.amount}  
                                        </Button>
                                    </div>
                                
                            )}

                            <Button color = 'success' onClick={Addmoney} > Add </Button>

                        </div>

                    </form>
                </div>
                </Modal.Body>
            </Modal>
 </>
  )
}

export default UserOperations




