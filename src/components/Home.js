import React, { Component } from 'react'
import '../styles/screen.sass'
import Answer from './Answer'
import Navigation from './Navigation'
import { Link, browserHistory } from 'react-router'

class Home extends Component {

  static propTypes = {
    todaysQuestion: React.PropTypes.object,
    location: React.PropTypes.object,
    submitAnswer: React.PropTypes.func,
    reviseAnswer: React.PropTypes.func,
    answersForQuestion: React.PropTypes.func
  }

  constructor (props) {
    super(props)

    this.state = { answer: '' }
  }

  componentWillReceiveProps (props) {
    const answer = this.answerForTodaysQuestion ? this.answerForTodaysQuestion.text : ''

    this.state = { answer: answer }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    if (this.answerForTodaysQuestion) {
      this.props.reviseAnswer(this.refs.answer.value, this.answerForTodaysQuestion.id).then(() => {
        // Force a page update
        document.location.reload()
      })
    } else {
      this.props.submitAnswer(this.refs.answer.value)
    }
  }

  handleUpdateAnswer = (event) => {
    this.setState({answer: event.target.value})
  }

  get answers () {
    let question = this.props.todaysQuestion
    let answers = this.props.answersForQuestion(question)
    let filtered
    switch (this.props.location.pathname) {
      case '/picks':
        filtered = answers.filter((answer) => {
          return answer.staff_pick
        })
        break
      case '/friends':
        filtered = answers.filter((answer) => {
          // If the answer's user_id is someone we are following
          return this.props.isFollowing(answer.user_id)
        })
        break
      default:
        filtered = answers
    }

    return filtered.reverse().map((answer, i) => <Answer answer={answer} getUser={this.props.getUser} key={i} />)
  }

  logout = (event) => {
    event.preventDefault()
    this.props.auth.logout()
    browserHistory.push('/')
  }

  get answerForTodaysQuestion () {
    return this.props.answerForTodaysQuestion(this.props.auth.getUserId())
  }

  get myResponse () {
    if (!this.props.auth.loggedIn()) {
      return <div />
    }

    const prompt = this.answerForTodaysQuestion ? 'REVISE' : 'RESPOND'

    return (
      <div className='myResponse'>
        <div className='myResponse-avatar'>
          <img src={this.props.auth.getProfileImageURL()} alt='myAvatar' />
        </div>
        <div className='answer-container'>
          <div className='answer-comment-box'>
            <div className='answer-comment-form'>
              <form>
                <div>
                  <textarea id='comment' placeholder='Type your Response Here...' ref='answer' onChange={this.handleUpdateAnswer} value={this.state.answer} />
                </div>
                <nav className='nav-answer'>
                  <button type='submit' onClick={this.handleSubmit}>{prompt}</button>
                </nav>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  myFriends () {
    if (!this.props.auth.loggedIn()) {
      return ''
    }

    return <li><Link to='/friends' activeClassName='active'>My Friends</Link></li>
  }

  render () {
    return <div className='home-screen'>
      <header>
        <img src={require('../../images/qtdfullwlogo.png')} alt='QuestionOftheDay' />
        <Navigation auth={this.props.auth} />
      </header>
      <div className='todaysQuestion'>
        <img src={require('../../images/todaysQuestion.png')} alt='todaysQuestion' />
        <Link to='/login'><h1>{this.props.todaysQuestion.text}</h1></Link>
      </div>

      {this.myResponse}

      <div className='user-responses'>
        <div className='user-responses-header'>
          <img src={require('../../images/todaysAnswers.png')} />
          <ul className='nav nav-tabs'>
            <li><Link to='/'>All</Link></li>
            {this.myFriends()}
            <li><Link to='/picks' activeClassName='active'>Staff Picks</Link></li>
          </ul>
        </div>

        {this.answers}

      </div>
    </div>
  }
}
export default Home
