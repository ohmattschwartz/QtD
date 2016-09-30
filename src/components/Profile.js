import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import { browserHistory, Link } from 'react-router'

class Profile extends Component {

  static propTypes = {
    todaysQuestion: React.PropTypes.object,
    location: React.PropTypes.object,
    submitAnswer: React.PropTypes.func,
    answersForQuestion: React.PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitAnswer(this.refs.answer.value)
  }

  get answers () {
    let question = this.props.todaysQuestion
    let answers = this.props.answersForQuestion(question)
    let filtered
    switch (this.props.location.pathname) {
      case '/stars':
        filtered = []
        break
      case '/picks':
        filtered = answers.filter((answer) => {
          return answer.staff_pick
        })
        break
      case '/friends':
        filtered = []
        break
      default:
        filtered = answers
    }

    return filtered.reverse().map((answer, i) => <Answer answer={answer} key={i} />)
  }

  logout = (event) => {
    event.preventDefault()
    this.props.auth.logout()
    browserHistory.push('/')
  }

  render () {
    return <div className='profile-screen'>
    <header>
      <img src={require('../../images/qtdfullwlogo.png')} alt='QuestionOftheDay' />
      <div className='options'>
        <div className='menu'>
          <nav className='nav-desktop'>
            <a href='/'>Home</a>
            <a href='/profile'>My Profile</a>
            <a href='/about'>About Us</a>
            <a href='#' onClick={this.logout}>Log Out</a>
          </nav>
          <nav className='nav-mobile'>
            <button id='nav-toggle'>Toggle</button>
            <div className='nav-menu nav-hidden'>
              <a href='/'>Home</a>
              <a href='/profile'>My Profile</a>
              <a href='/about'>About Us</a>
              <a href='#' onClick={this.logout}>Log Out</a>
            </div>
          </nav>
        </div>
      </div>
    </header>
      <div className='profile-info'>
        <div className='profile-avatar'>
          <img src={require('../../images/avatarFour.jpg')} alt='Profile Photo' />
        </div>
        <div className='profile-bio'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </div>
      <div className='user-responses'>
        <div className='user-responses-header'>
          <img src={require('../../images/todaysAnswers.png')} />
          <ul className='nav nav-tabs'>
            <li><Link to='/'>All</Link></li>
            <li><Link to='/friends' activeClassName='active'>My Friends</Link></li>
            <li><Link to='/picks' activeClassName='active'>Staff Picks</Link></li>
          </ul>
        </div>
        {this.answers}
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
      </div>
    </div>
  }
}
export default Profile
