import React from 'react';
import './App.css';
import Posts from './components/Posts/Posts'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allreducers from './store/reducers'

const store = createStore(allreducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

function App() {
  return (
    <Provider store={store}>
        <Posts />
    </Provider>
  );
}

export default App;
