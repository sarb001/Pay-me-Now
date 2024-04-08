import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios' ;

const Users = () => {
    
   const [users,setusers] = useState('');
   const token   = localStorage.getItem('token');
   console.log('token users ==',token);

   useEffect(() => {
      const fetchdata = async () => {
        try {
          const allusers  = await axios.get('/api/v1/bulk',{
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
      },[])


  return (
    <>
      <div style = {{margin:'4%',display:'flex' ,flexDirection: 'column' ,justifyContent:'center' , alignItems:'center'}}>
        <div>
          <input style = {{padding:'2% 2%'}} type = "text"  placeholder= "Enter User Name"  value ={users} 
          onChange={(e) => setusers(e.target.value)} />
         </div>
        <div>
          <h2> Showing All Users </h2>
        </div>

       <div style = {{ display:'flex' , flexDirection:'column' ,backgroundColor:'lightsalmon',margin:'3%',padding:'4%'}}>
         
          {users && users?.map((i) => 
          {
            return (
              <div key = {i._id}>
               <div style = {{paddingTop:'8% 5%'}}>
                  {i.username} 
                  <span>  <Link to = "/send"> Send Money </Link>  </span>
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