import React, { useEffect, useState } from 'react'
import { Link  ,useNavigate } from 'react-router-dom';
import axios from 'axios' ;
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from "flowbite-react";
import { RequestMoney } from '../Slices/userSlice';


const Users = () => {
    
   const [searchuser,setsearchuser] = useState('');
   const [users,setusers] = useState('');

   const [openModal, setOpenModal] = useState(false);
   const [modalamount,setmodalamount] = useState(0);

   const [selecteduser,setselecteduser] = useState(null);

   const {  userData   ,usertoken  } = useSelector(state => state?.users);
   console.log('usertoken =',usertoken);
   console.log('userdata users  =',userData);

 
   const MoneyButtons = [
      { amount : 10 ,id : 1 },
      { amount : 100 ,id : 2 },
      { amount : 500 ,id : 3 },
      { amount : 1000 ,id : 4 },
   ]


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
   const navigate = useNavigate();

   const dispatch = useDispatch();

  // working properly but re-rendering mutiple time find better solution 

   useEffect(() => {
      const fetchdata = async () => {
        try {
          const allusers  = await axios.get(`/api/v1/bulk?filter=${searchuser}`, {
            headers : {
              'Authorization' : `Bearer ${usertoken}`
            }
          });
          setusers(allusers.data.user);
          console.log('allusers =',allusers);
        } catch (error) {
          console.log('error =',error);
        } 
      }
     fetchdata();
    },[searchuser])

    const requestmoney = (id ,fullname) => {
          console.log(' id is == ',id);
          console.log(' fullname is == ',fullname);
          console.log(' modalrequst=',modalamount);
          console.log('selecteduser' ,selecteduser);
          dispatch(RequestMoney({usertoken,modalamount,id ,fullname}))
    }


  return (
    <>
      <div style = {{margin:'4%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center'}}>

          <div>
            <input style = {{padding:'2% 2%'}} type = "text"  placeholder= "Enter User Name"  value = {searchuser} 
            onChange={(e) => setsearchuser(e.target.value)} />
          </div>

          <div>
            <div className='font-bold'> Showing All Users </div>
          </div>

          <div style = {{ display:'flex' , flexDirection:'column' ,backgroundColor:'lightsalmon',margin:'1%',padding:'2%'}}>
            
              {users && users?.map((i) => 
              {
                return (
                  <div key = {i._id}>
                  <div className='mx-4 my-1 font-bold'>
                    <div className='grid grid-cols-2 bg-slate-500 p-3'>
                      <div> {i.username} </div>

                        <div className='grid grid-cols-2 gap-2'>
                            <div> 
                              <button className='bg-black text-white p-2 px-6'
                              onClick={(e) =>{
                                navigate("/send?id=" + i._id + "&name=" + i.username)
                              }}> 
                              <Link to = "/send"> Pay </Link> 
                              </button>
                            </div>

                              <div>
                              <Button onClick = {() => {
                                setOpenModal(true)
                                setselecteduser({ id : i?._id , fullname : i?.fullname })
                                }
                                }> Requested Money </Button>
                              </div>

                        </div>
                    </div>
                  </div>


                    {/* Request Money Modal */}

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

                            </div>

                                <Button onClick={()  => requestmoney(selecteduser?._id,selecteduser?.fullname)}> Request Now </Button>
                        </form>
                    </div>
                    </Modal.Body>
                </Modal>

                  </div>
                )
              })}

          </div>

       </div>
    </>
  )
}

export default Users
