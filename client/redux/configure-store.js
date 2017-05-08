import {
  createStore,
  applyMiddleware
} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import ReduxThunk from 'redux-thunk';

const configureStore = () => {
  const store = createStore(state => state, applyMiddleware(promiseMiddleware(), ReduxThunk));
  return store;
};

export default configureStore;
