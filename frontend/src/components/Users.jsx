import React, { useEffect, useState } from 'react'
import { Link  ,useNavigate,useSearchParams } from 'react-router-dom';
import axios from 'axios' ;

const Users = () => {
    
   const [searchuser,setsearchuser] = useState('');
   const [users,setusers] = useState('');
   const token   = localStorage.getItem('token');
   console.log('token users ==',token);

   const navigate = useNavigate();

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
            <input style = {{padding:'2% 2%'}} type = "text"  placeholder= "Enter User Name"  value ={searchuser} 
            onChange={(e) => setsearchuser(e.target.value)} />
          </div>

          <div>
            <h2> Showing All Users </h2>
          </div>

          <div style = {{ display:'flex' , flexDirection:'column' ,backgroundColor:'lightsalmon',margin:'1%',padding:'2%'}}>
            
              {users && users?.map((i) => 
              {
                return (
                  <div key = {i._id}>
                  <div style = {{paddingTop:'2% 1%'}}>
                      {i.username} 
                      <span> 
                        <button style = {{padding:'2%'}} 
                        onClick={(e) =>{
                          navigate("/send?id=" + i._id + "&name=" + i.username)
                        }}> 
                         <Link to = "/send"> Send Money </Link> 
                        </button>
                       </span>
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