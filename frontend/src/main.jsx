import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' ;
import { Provider } from 'react-redux' ;
import { mainstore } from './Store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {mainstore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
