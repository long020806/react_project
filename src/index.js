import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import StorageUtils from './utils/StorageUtils';
import MemoryUtils from './utils/MemoryUtils';
import { Provider } from 'react-redux';
import store from "./redux/store"
//读取local中保存的user
const user = StorageUtils.getUser();
MemoryUtils.user = user;
ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>
    ,
  document.getElementById('root')
);

