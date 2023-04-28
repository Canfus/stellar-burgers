import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter, HashRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './services/store';

import App from './components/App/App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </HashRouter>
    </Provider>
);