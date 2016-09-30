import React, { Component, PropTypes as T } from 'react'
import { browserHistory } from 'react-router'
import AuthService from '../utils/AuthService'

class Login extends Component {

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  render () {
    return <div className='login-screen'>
      <header>
        <img src={require('../../images/qtdfullwlogo.png')} alt='Question the Day' />
      </header>
      <div className='login'>
        <button onClick={this.props.auth.login}>
          Login or Signup
        </button>
      </div>
      <div className='appLogo'>
        <img src={require('../../images/applogo.svg')} alt='applogo' />
      </div>
      <div className='about'>
        <p>Using the power of the written word to connect everyday people.</p>
        <p>Every day.</p>
      </div>
      <footer>
        <div className='copyright-footer'>
          <p>Copyright &copy; 2016</p>
        </div>
        <div className='designed-by-footer'>
          <p>Designed by Matt Schwartz</p>
        </div>
        <div className='TIY-footer'>
          <img src={require('../../images/tiyLogo.png')} alt='TIY Logo' />
        </div>
      </footer>
      <video className='background' playsInline autoPlay muted loop>
        <source src={require('../../images/brettwriting.mp4')} type='video/mp4' />
      </video>
    </div>
  }
}

export default Login
