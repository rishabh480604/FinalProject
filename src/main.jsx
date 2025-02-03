import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  store  from './store/store'
import { Provider } from 'react-redux'
import Chat from './Components/pages/Lamma'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <div className=' fixed bottom-1/4 right-4 h-max:1/3 p-4 box-content rounded shadow-lg '><Chat/></div>
    </Provider>
  </StrictMode>
  
)
