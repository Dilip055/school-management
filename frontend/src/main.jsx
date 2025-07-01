import { createRoot } from 'react-dom/client'
import './index.css'


import Routing from './Routing.jsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from './Context/Authcontext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
     <Routing />
  </AuthProvider>
  </BrowserRouter>,
)
