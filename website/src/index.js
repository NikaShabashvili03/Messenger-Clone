import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import ActiveStatus from './components/ActiveStatus';
import ModalContext from './context/ModalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ActiveStatus/>
            <App/>
        </Provider>
    </BrowserRouter>
);

