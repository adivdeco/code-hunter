// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { BrowserRouter } from 'react-router'
// import {Provider} from "react-redux"
// import {store} from "./store/store.js"

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>
//      <BrowserRouter>

//      <App />

//      </BrowserRouter>
//     </Provider>

//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router';
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: '',
            style: {
              background: '#333',
              color: '#fff',
              border: '1px solid #555',
            },
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);