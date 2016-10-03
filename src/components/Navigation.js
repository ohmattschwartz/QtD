import React, { Component, PropTypes as T } from 'react'
import { Link, browserHistory } from 'react-router'

class Navigation extends Component {

  static propTypes = {
    auth: T.object
  }

  logout = (event) => {
    event.preventDefault()
    this.props.auth.logout()
    browserHistory.push('/')
  }

  sessionButton () {
    if (this.props.auth.loggedIn()) {
      return <a href='#' onClick={this.logout}>Log Out</a>
    } else {
      return <Link to='/login'>Log In</Link>
    }
  }

  render () {
    return <div className='options'>
      <div className='menu'>
        <nav className='nav-desktop'>
          <Link to='/'>Home</Link>
          <a href='/my_profile'>My Profile</a>
          <a href='/about'>About Us</a>
          {this.sessionButton()}
        </nav>
        <nav className='nav-mobile'>
          <button id='nav-toggle'>Toggle</button>
          <div className='nav-menu nav-hidden'>
            <a href='/'>Home</a>
            <a href='/my_profile'>My Profile</a>
            <a href='/about'>About Us</a>
            {this.sessionButton()}
          </div>
        </nav>
      </div>
    </div>
  }
}

export default Navigation
