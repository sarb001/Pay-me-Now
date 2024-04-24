import React, { useEffect, useState } from 'react'
import { Link  ,useNavigate } from 'react-router-dom';
import axios from 'axios' ;
import { useDispatch } from 'react-redux';

const Users = () => {
    
   const [searchuser,setsearchuser] = useState('');
   const [users,setusers] = useState('');
   const token   = localStorage.getItem('token');
   console.log('token ==',token);


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
   const navigate = useNavigate();

  // working properly but re-rendering mutiple time find better solution 

   useEffect(() => {
      const fetchdata = async () => {
        try {
          const allusers  = await axios.get(`/api/v1/bulk?filter=${searchuser}`, {
            headers : {
              'Authorization' : `Bearer ${token}`
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

                       
                              <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                                 Requested Money
                              </button>

                      </div>
                    </div>
                  </div>
                  </div>
                )
              })}

          </div>

              {/* Request Money Modal */}

          <div>
            
          </div>

       </div>
    </>
  )
}

export default Users


{/* <div class="p-4 md:p-5"> */}
{/* <form class="space-y-4" >

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

</form> */}
{/* </div> */}