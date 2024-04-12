import React from 'react'
import { useSelector } from  'react-redux' ;
import { Navigate , useLocation } from 'react-router-dom' ;
 
const ProtectedRoute = ({children}) => {

    const { userData } = useSelector(state => state?.users);
    console.log('protected route  =',userData);

    const location = useLocation();

    return  userData ? (
        children
    ) : (
        <Navigate  to = "/login"  state = {{ prevUrl : location.pathname }} replace />
    )
  
}

export default ProtectedRoute