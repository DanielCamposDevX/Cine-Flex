import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import axios from "axios"

axios.defaults.headers.common['Authorization'] = 'CKqZAzCDUWLLSRCSKYZV4Y16';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
