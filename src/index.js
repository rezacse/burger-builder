import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';
import reducer from './store/reducer';

const reduxStore = createStore(reducer);

const app = (
    <Provider store={reduxStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
