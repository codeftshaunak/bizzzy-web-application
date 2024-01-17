import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { SocketProvider } from './Contexts/SocketContext.jsx';
import { CurrentUserProvider } from './Contexts/CurrentUser.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUserProvider>
        <SocketProvider>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </SocketProvider>
      </CurrentUserProvider>
    </Provider>
  </React.StrictMode>,
);
