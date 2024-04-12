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
import { ToastContainer , toast  } from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css' ;
import { useDispatch , useSelector } from 'react-redux' ;
import { useEffect } from 'react';
import { ValidateUser } from './Slices/userSlice';

function App() {
  
  const { userData , usertoken } = useSelector(state => state?.users);
  console.log('protected route app  =',userData);

   const dispatch = useDispatch();

   useEffect(() => {
      console.log('user vadiated -');
      dispatch(ValidateUser({usertoken}));
   },[dispatch])


  return (
    <>
       <Navbar />
        <Routes> 
          <Route  path='/'  element = {<Home /> } />
          <Route  path='/dashboard'  element = {<Dashboard /> } />
          <Route  path='/alltransaction'  element = {<AllTransactions /> } />
          <Route  path='/profile'  element = {<UserProfile /> } />
          <Route  path='/users'  element = {<Users /> } />
          <Route  path='/signup'  element = {<Signup /> } />
          <Route  path='/login'  element = {<Login /> } />
          <Route  path='/send'  element = {<SendMoney /> } />
        </Routes>
        <ToastContainer />
    </>
  )
}

export default App
