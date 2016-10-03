import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
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
    let other_user_id = this.userId

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
