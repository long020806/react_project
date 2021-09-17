import 'antd/dist/antd.css';
import React, { Component } from 'react'
import Login from './pages/Login/Login';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Admin from './pages/Admin/Admin';
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Admin}></Route>
          </Switch>
      </BrowserRouter>
    )
  }
}
