import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Login from './components/Login'
import About from './components/About'
import MyProfile from './components/MyProfile'
import Profile from './components/Profile'
import AuthService from './utils/AuthService'

const auth = new AuthService()

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
}

const postLogin = (nextState, replace) => {
  if (auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

const router = <Router history={browserHistory}>
  <Route component={App} auth={auth}>
    <Route path='/' component={Home}>
      <Route path='/friends' onEnter={requireAuth} />
      <Route path='/stars' />
      <Route path='/picks' />
    </Route>
    <Route path='/login' component={Login} onEnter={postLogin} />
    <Route path='/about' component={About} />
    <Route path='/my_profile' component={MyProfile} onEnter={requireAuth} />
    <Route path='/profile/:userId' component={Profile} onEnter={requireAuth} />
  </Route>
</Router>

render(router, document.getElementById('root'))
