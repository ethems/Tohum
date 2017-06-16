import React from 'react';
import { render } from 'react-dom';

import configureStore from './redux/configure-store';

import App from './components/app';


const store = configureStore();

render(<App store={store} />, document.getElementById('app'));
