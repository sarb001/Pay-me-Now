import { Route, Routes } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';
import Users from './components/Users';
import AllTransactions from './components/AllTransactions';
import { ToastContainer   } from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css' ;
import { useDispatch , useSelector } from 'react-redux' ;
import { useEffect } from 'react';
import { ValidateUser } from './Slices/userSlice';
import ProtectedRoute from './utils/ProtectedRoute';
import { initFlowbite } from 'flowbite' ;
import SentRequest from './Services/SentRequest';
import RecievedRequest from './Services/RecievedRequest';


function App() {
  
  const { userData , usertoken } = useSelector(state => state?.users);
  console.log('protected route app  =',userData);
  console.log('protected route token  =',usertoken);

   const dispatch = useDispatch();

   useEffect(() => {
      console.log('user vadiated -');
      initFlowbite();
      dispatch(ValidateUser({usertoken}));
   },[dispatch])


  return (
    <>
       <Navbar />
          <Routes> 
            <Route  path='/'  element = {<Home /> } />
            <Route  path='/signup'  element = {<Signup /> } />
            <Route  path='/login'  element = {<Login /> } />

            <Route  path='/dashboard'  element = {
              <ProtectedRoute>
                  <Dashboard /> 
              </ProtectedRoute>
            } />
            <Route  path='/alltransaction'  element = {
              <ProtectedRoute>
                <AllTransactions /> 
              </ProtectedRoute>
            } />
            <Route  path='/profile'  element = { <ProtectedRoute>  <UserProfile /> </ProtectedRoute> } />

            <Route  path='/users'  element = {
              <ProtectedRoute>
                 <Users /> 
              </ProtectedRoute>
            } />

            <Route  path = '/send'  element = { <ProtectedRoute> <SendMoney /> </ProtectedRoute> } />

            <Route  path = '/sentrequests'  element = { 
            <ProtectedRoute>
               <SentRequest />
            </ProtectedRoute> } />
            <Route  path = '/recievedrequests'  element = { 
            <ProtectedRoute> 
              <RecievedRequest /> 
            </ProtectedRoute> } />

          </Routes>

        <ToastContainer />
    </>
  )
}

export default App
