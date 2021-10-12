import 'antd/dist/antd.css';
import React, { Component } from 'react'
import Login from './pages/Login/Login';
import {HashRouter,Route,Switch} from 'react-router-dom'
import Admin from './pages/Admin/Admin';
export default class App extends Component {
  render() {
    return (
      <HashRouter>
          <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/" component={Admin}></Route>
          </Switch>
      </HashRouter>
    )
  }
}
