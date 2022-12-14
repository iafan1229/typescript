import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <HashRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
        <App />
        </Provider>
      </PersistGate>
    </HashRouter>
  </React.StrictMode>
);
