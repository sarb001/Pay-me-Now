import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {

  return (
    <>
       <Navbar />
        <Routes> 
          <Route  path='/'  element = {<Home /> } />
          <Route  path='/profile'  element = {<UserProfile /> } />
          <Route  path='/signup'  element = {<Signup /> } />
          <Route  path='/login'  element = {<Login /> } />
        </Routes>
    </>
  )
}

export default App
