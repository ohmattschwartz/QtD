import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import Navigation from './Navigation'
import { browserHistory, Link } from 'react-router'

class MyProfile extends Component {

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
    const answers = this.props.myAnswers()

    return answers.reverse().map((answer, i) => <Answer answer={answer} showsQuestion={true} questionForId={this.props.questionForId} getUser={this.props.getUser} key={i} />)
  }

  logout = (event) => {
    event.preventDefault()
    this.props.auth.logout()
    browserHistory.push('/')
  }

  render () {
    const user = this.props.getUser(this.props.auth.getUserId())

    return <div className='profile-screen'>
    <header>
      <img src={require('../../images/qtdfullwlogo.png')} alt='QuestionOftheDay' />
      <Navigation auth={this.props.auth} />
    </header>
      <div className='profile-info'>
        <div className='profile-avatar'>
          <img src={user.picture_large} alt='Profile Photo' />
        </div>
        <div className='profile-name'>
          <p>{user.name}</p>
        </div>
      </div>
      <div className='user-responses'>
        <div className='user-responses-header'>
          <img src={require('../../images/myAnswers.png')} />
        </div>
        <div className='user-answers'>
          {this.answers}
        </div>
      </div>
    </div>
  }
}
export default MyProfile
