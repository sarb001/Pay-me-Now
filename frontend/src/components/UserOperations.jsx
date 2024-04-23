import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaCircleArrowRight } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import Modal from 'react-modal' ;
import { useDispatch } from 'react-redux';

const UserOperations = () => {

    const [modalamount,setmodalamount] = useState(0);

 
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
         console.log('modalamount ==',Number(modalamount));
         setmodalamount(Number(finalamount) + Number(modalamount));
     }  

     const onchangeamount = (e) => {
        const amountchanged = e.target.value;
        console.log('event amount chg=',amountchanged);
        setmodalamount(amountchanged);
     }

        // if modalinput = ' ' just add btn clicked amount 
        // modalinput = 100
        // modalinput = btn clicked amount + modalinput 

  return (
    <>
         <div className='mt-5 bg-slate-300 grid grid-cols-2 text-center p-4 '>   
           
                <div>

                    <div className='m-4'>
                        <button className='bg-blue-400 p-2 px-8  font-bold border-2 border-black'> 
                            <Link to = "/users" > Pay /Request Money  </Link> 
                        </button>
                    </div>

                    <div className='m-4'>
                            <button className='bg-blue-400 p-2 px-8  font-bold border-2  border-black'>
                            <Link to = "/recievedrequests" > Received Requests  </Link>
                             </button>
                    </div> 
                
                </div>
            
            <div>

                    <div className='m-4'>
                        <button className=' font-bold bg-blue-400 p-2 px-8 border-2 border-black'> 
                          <Link to = "/sentrequests" >  Sent Requests   </Link>
                        </button>
                    </div>   

                    <div>
                        <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Add Money 
                        </button>
                    </div>

            </div>

            <div className='m-4 flex'> 
                    <button className='bg-blue-400 p-2 px-8  font-bold border-2 border-black'>
                    <Link to = "/alltransaction" >  All Transactions  </Link>  
                    </button>
            </div>
           

            {/*  Add Money Modal  */}

                <div>
                    <div id="authentication-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">

                        <div class="relative p-4 w-full max-w-md max-h-full">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add Money Now 
                                    </h3>
                                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>
                            
                                <div class="p-4 md:p-5">
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
                                                        <button  
                                                        type = "submit"
                                                        onClick={(e) => showmamount(e)} class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"> 
                                                            {item.amount}  
                                                        </button>
                                                    </div>
                                                
                                            )}

                                        </div>

                                     </form>
                                </div>
                            </div>
                        </div>


                    </div> 
                </div>

    </div>
 </>
  )
}

export default UserOperations




