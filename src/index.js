import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './configure.store';
import App from './root-cmp';

import './index.css';
import './assets/styles/styles.scss'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Provider store={store} >
      <App />
    </Provider>
  </Router>
);