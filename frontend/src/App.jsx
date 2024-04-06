import { BrowserRouter, Route, Routes } from 'react-router-dom' ;
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import Home from './components/Home';

function App() {

  return (
    <>
       <Navbar />
        <Routes> 
          <Route  path='/'  element = {<Home /> } />
          <Route  path='/profile'  element = {<UserProfile /> } />
        </Routes>
    </>
  )
}

export default App
