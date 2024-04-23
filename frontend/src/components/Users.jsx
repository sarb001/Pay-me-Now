import React, { useEffect, useState } from 'react'
import { Link  ,useNavigate } from 'react-router-dom';
import axios from 'axios' ;

const Users = () => {
    
   const [searchuser,setsearchuser] = useState('');
   const [users,setusers] = useState('');
   const token   = localStorage.getItem('token');
   console.log('token ==',token);


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
                          <div> 
                            <button className='bg-black text-white p-2 px-6'
                            onClick={(e) =>{
                              navigate("/send?id=" + i._id + "&name=" + i.username)
                            }}> 
                            <Link to = "/send"> Send Money </Link> 
                            </button>
                          </div>
                    </div>
                  </div>
                  </div>
                )
              })}

          </div>

       </div>
    </>
  )
}

export default Users