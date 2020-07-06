import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './Routes/MainRouter';
import './App.css';

const App = () => (
  <BrowserRouter>
    <MainRouter/>
  </BrowserRouter>
);

export default App;
