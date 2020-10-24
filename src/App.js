import React from 'react';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import Posts from './Posts/Posts'

function App() {
  return (
    <BrowserRouter>
        <Posts />
    </BrowserRouter>
  );
}

export default App;
