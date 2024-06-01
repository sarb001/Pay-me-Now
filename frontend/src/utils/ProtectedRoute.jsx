import React from 'react'
import { useSelector } from  'react-redux' ;
import { Navigate , useLocation } from 'react-router-dom' ;
 
const ProtectedRoute = ({children}) => {

    const { usertoken } = useSelector(state => state?.users);
    console.log('Main  Protected =',usertoken);

    const location = useLocation();

    return  usertoken ? (
        children
    ) : (
        <Navigate  to = "/login"  state = {{ prevUrl : location.pathname }} replace />
    )
  
}

export default ProtectedRoute