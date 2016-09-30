import React, { Component } from 'react'
import '../styles/screen.sass'
import Api from './Api'

class App extends Component {

  static propTypes = {
    children: React.PropTypes.element
  }

  constructor () {
    super()

    this.state = {
      questions: [],
      answers: []
    }
  }

  reloadQuestions () {
    window.fetch(`${Api.url}/questions`, {
      headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' }})
      .then((response) => response.json())
      .then((data) => {
        this.setState({questions: data})
      })
  }

  reloadAnswers () {
    window.fetch(`${Api.url}/answers`, {
      headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' }})
      .then((response) => response.json())
      .then((data) => {
        this.setState({answers: data})
      })
  }

  componentWillMount () {
    this.reloadQuestions()
    this.reloadAnswers()
  }

  answersForQuestion = (question) => {
    return this.state.answers.filter((answer) => {
      return answer.question_id === question.id
    })
  }

  get todaysQuestion () {
    let question = this.state.questions.find((question) => question.day_posted === '2016-09-28')

    if (question) {
      return question
    } else {
      // Return something meaningful here
      return { text: 'Oooops', day_posted: 'Never' }
    }
  }

  submitAnswer = (text) => {
    const { auth } = this.props.route
    if (auth.loggedIn()) {
      let question = this.todaysQuestion

      window.fetch(`${Api.url}/answers`, {
        method: 'POST',
        headers: { 'Authorization': Api.bearer_token, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          question_id: question.id,
          user_id: auth.getToken()
        })
      }).then(() => this.reloadAnswers())
    }
  }

  render () {
    return <div className='app-container'>
      {React.cloneElement(this.props.children,
        {
          auth: this.props.route.auth,
          todaysQuestion: this.todaysQuestion,
          submitAnswer: this.submitAnswer,
          answersForQuestion: this.answersForQuestion
        })}
    </div>
  }
}

export default App
