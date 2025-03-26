import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'setimmediate'
import App from './App.jsx'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './Component/Store/index.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>

    <App />
  
  </Provider>,
)
