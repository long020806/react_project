import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StorageUtils from './utils/StorageUtils';
import MemoryUtils from './utils/MemoryUtils';
//读取local中保存的user
const user = StorageUtils.getUser();
MemoryUtils.user = user;
ReactDOM.render(
    <App />,
  document.getElementById('root')
);

