import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import SendMoney from './components/SendMoney';

function App() {

  return (
    <>
       <Navbar />
        <Routes> 
          <Route  path='/dashboard'  element = {<Dashboard /> } />
          <Route  path='/profile'  element = {<UserProfile /> } />
          <Route  path='/signup'  element = {<Signup /> } />
          <Route  path='/login'  element = {<Login /> } />
          <Route  path='/send'  element = {<SendMoney /> } />
        </Routes>
    </>
  )
}

export default App
