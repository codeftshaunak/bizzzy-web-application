import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { SocketProvider } from './Contexts/SocketContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
