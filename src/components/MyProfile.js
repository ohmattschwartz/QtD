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

  get ansers () {
    <div className='user-answers'>
      {this.answers}
    </div>
  }

  userDisplay (following) {
    const user = this.props.getUser(following.them)

    return  <div className='response-lists'>
              <div key={user.id} className='my-friend'>
                <img src={user.picture} />
                <div className='friend-response'>
                  <p className='friend-response-name'><Link to={`/profile/${user.id}`}>{user.name}</Link></p>
                </div>
              </div>
            </div>
  }

  get followers () {
    return this.props.myFollowings().map((following) => this.userDisplay(following))
  }

  get page () {
    switch (this.props.location.pathname) {
      case '/my-answers':
        return this.answers
      case '/my-followers':
        return <div>{this.followers}</div>
      default:
        return this.answers
    }
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
          <ul className='nav nav-tabs'>
            <li><Link to='/my-answers'>My Answers</Link></li>
            <li><Link to='/my-followers' activeClassName='active'>My Followers</Link></li>
          </ul>
        </div>
        {this.page}
      </div>
    </div>
  }
}
export default MyProfile
