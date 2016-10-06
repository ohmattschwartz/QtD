import React, { Component, PropTypes as T } from 'react'
import { Link, browserHistory } from 'react-router'
import cx from 'classnames'

class Navigation extends Component {

  static propTypes = {
    auth: T.object
  }

  constructor () {
    super()
    this.state = {
      expanded: false
    }
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

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  // toggle.classList.toggle('expanded')
  // element.classList.toggle('nav-hidden')

  render () {
    return <div className='options'>
      <div className='menu'>
        <nav className='nav-desktop'>
          <Link to='/'>Home</Link>
          <Link to='/my_profile'>My Profile</Link>
          <Link to='/about'>About Us</Link>
          {this.sessionButton()}
        </nav>
        <nav className='nav-mobile'>
          <button id='nav-toggle' className={cx({expanded: this.state.expanded})} onClick={this.handleClick}>Toggle</button>
          <div className={cx('nav-menu', {'nav-hidden': !this.state.expanded})}>
            <Link to='/'>Home</Link>
            <Link to='/my_profile'>My Profile</Link>
            <Link to='/about'>About Us</Link>
            {this.sessionButton()}
          </div>
        </nav>
      </div>
    </div>
  }
}

export default Navigation
