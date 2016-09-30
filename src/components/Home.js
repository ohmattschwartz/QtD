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
    return <div className='home-screen'>
      <header>
        <img src={require('../../images/qtdfullwlogo.png')} alt='QuestionOftheDay' />
        <Navigation auth={this.props.auth} />
      </header>
      <div className='todaysQuestion'>
        <img src={require('../../images/todaysQuestion.png')} alt='todaysQuestion' />
        <h1>{this.props.todaysQuestion.text}</h1>
      </div>
      <div className='myResponse'>
        <div className='myResponse-avatar'>
          <img src={require('../../images/avatarFour.jpg')} alt='myAvatar' />
        </div>
        <div className='answer-container'>
          <div className='answer-comment-box'>
            <div className='answer-comment-form'>
              <form>
                <div>
                  <textarea id='comment' placeholder='Type your Response Here...' ref='answer' />
                </div>
                <nav className='nav-answer'>
                  <button type='submit' onClick={this.handleSubmit}>RESPOND</button>
                </nav>
              </form>
            </div>
          </div>
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
export default Home
