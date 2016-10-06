import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import Navigation from './Navigation'
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
        <Navigation auth={this.props.auth} />
      </header>
      <div className='about-logo'>
        <img src={require('../../images/applogo.svg')} alt='App Logo' />
      </div>
      <div className='about-text'>
        <p>Founded by writer-turned-programmer Matt Schwartz in 2016, QtD asks a daily subjective question (No trivia, no right or wrong answers- exclusively responses that are right for YOU) that can range from "What color shirt are you wearing today?" all the way to "What is your deepest, darkest secret?" (Just kidding, that's none of our business and frankly you should probably keep that to yourself anyway). Questions post every morning at 12am EST. Special recognition goes to the first 5 people to respond.</p>
        <p>There are no character limits.  There are no time limits.  Choose who you want to follow: friends, celebrites, celebrity friends, even family-members (if that's really what you want for your life) and check out their answers to every daily question they've responded to. Check out who they follow and, if you dig what you see, follow them too!</p>
        <p>After all, isn't that what Social Media is all about?  Sharing your thoughts with the world?  Finding people whose point of view is worth taking the time to check out?  Well, thanks to QtD, TODAY is your chance.  Question of the Day: Using the power of the written word to connect everyday people. Every day.</p>
      </div>
      <video className='background' playsInline autoPlay muted loop>
        <source src={require('../../images/brettwriting.mp4')} type='video/mp4' />
      </video>
    </div>
  }
}
export default About
