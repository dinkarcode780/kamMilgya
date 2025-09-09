import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { createRoot } from 'react-dom/client'
import './index.css'
// import { PersistGate } from 'redux-persist/integration/react';
import App from './App.jsx'
import {store } from './app/store.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <App />
    {/* </PersistGate> */}
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    /> 
    </Provider>


)
