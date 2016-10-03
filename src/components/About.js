import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import { Link } from 'react-router'

class About extends Component {

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
  }

  render () {
    return <div className='about-screen'>
      <header>
        <img src={require('../../images/qtdfullwlogo.png')} alt='QuestionOftheDay' />
        <div className='options'>
          <div className='menu'>
            <nav className='nav-desktop'>
              <a href='/'>Home</a>
              <a href='/my_profile'>My Profile</a>
              <a href='/about'>About Us</a>
              <a href='#' onClick={this.logout}>Log Out</a>
            </nav>
            <nav className='nav-mobile'>
              <button id='nav-toggle'>Toggle</button>
              <div className='nav-menu nav-hidden'>
                <a href='/'>Home</a>
                <a href='/my_profile'>My Profile</a>
                <a href='/about'>About Us</a>
                <a href='#' onClick={this.logout}>Log Out</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <div className='about-logo'>
        <img src={require('../../images/applogo.svg')} alt='App Logo' />
      </div>
      <div className='about-text'>
        <p>Question of the Day was designed with one thing in mind: Connecting people together by harnessing the power of lanuage; of writing.</p>
        <p>Founded by Matt Schwartz in 2016, QtD asks a daily subjective question (No trivia, no right or wrong answers- exclusively responses that are right for YOU) that can range from "What color shirt are you wearing today?" all the way to "What is the meaning of life?" Questions post every morning at 12am EST.</p>
        <p>There are no character limits.  There are no rules.  Choose who you want to follow, be it friends, celebrites, celebrities you're friends with, talking mimes, even Nicolas Cage (because, let's face it, we all would really like to know what's going on inside that guy's head) and check out their answers to the daily question.</p>
        <p>After all, isn't that what Social Media is all about?  Sharing your thoughts with the world?  Well, thanks to QtD, TODAY is your chance.</p>
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
export default About
