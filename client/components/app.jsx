import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import Root from './root';

const App = ({store}) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Root} />
        <Route path="/about" component={Root} />
      </div>
    </Router>
  </Provider>
);

export default App;
