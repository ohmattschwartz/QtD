import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import Navigation from './Navigation'
import Api from './Api'
import { browserHistory, Link } from 'react-router'

class Profile extends Component {

  static propTypes = {
    todaysQuestion: React.PropTypes.object,
    location: React.PropTypes.object,
    submitAnswer: React.PropTypes.func,
    answersForQuestion: React.PropTypes.func
  }

  get userId () {
    return parseInt(this.props.params.userId)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.submitAnswer(this.refs.answer.value)
  }

  get answers () {
    console.log("User Id")
    console.log(this.userId)
    let answers = this.props.answersForUserId(this.userId)

    console.log("answers")
    console.log(answers)

    return answers.reverse().map((answer, i) => <Answer answer={answer} showsQuestion={true} questionForId={this.props.questionForId} getUser={this.props.getUser} key={i} />)
  }

  logout = (event) => {
    event.preventDefault()
    this.props.auth.logout()
    browserHistory.push('/')
  }

  handleFollow = () => {
    let other_user_id = parseInt(this.userId)

    this.props.recordFollowing(other_user_id)
  }

  handleUnfollow (following_id) {
    this.props.removeFollowing(following_id)
  }

  followButton = () => {
    let other_user_id = parseInt(this.userId)

    // We are looking at ourselves
    if (this.props.auth.getUserId() === other_user_id) {
      return ''
    }

    let following = this.props.isFollowing(other_user_id)

    if (following)
    {
      return <button type="submit" onClick={this.handleUnfollow.bind(this, following.id)}>Unfollow</button>
    }
    else {
      return <button type="submit" onClick={this.handleFollow}>Follow</button>
    }
  }

  render () {
    let user = this.props.getUser(parseInt(this.userId))

    return <div className='profile-screen'>
    <header>
      <img src={require('../../images/qtdfullwlogo.png')} alt='QuestiontheDay' />
      <Navigation auth={this.props.auth} />
    </header>
      <div className='profile-info'>
        <div className='profile-avatar'>
          <img src={user.picture_large} alt='Profile Photo' />
        </div>
        <div className='profile-name'>
          <p>{user.name}</p>
        </div>

        {this.followButton()}

      </div>
      <div className='user-responses'>
        <div className='user-responses-header'>
          <img src={require('../../images/myAnswers.png')} />
        </div>
        {this.answers}
      </div>
    </div>
  }
}
export default Profile
