import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import {store, persistor} from './store'
import {PersistGate} from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  {/* </React.StrictMode> */}
  </Provider>,
  document.getElementById('root')
);
