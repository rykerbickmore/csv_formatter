import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Home } from './home/Home';

ReactDOM.render(  
  <App ActiveComponent={Home}/>,
  document.getElementById('root')
);

